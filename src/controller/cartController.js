const cart = require('../models/Cart');
const jwtService = require('jsonwebtoken');
const user = require('../models/User')

module.exports = {
    getCart: (req, res) => {
        cart.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os Items" });
        });
    },
    deleteCart: async (req, res) => {
        if (req.user.permission === 10) {
        try {
            const result = await cart.deleteOne({ codCart: req.body.codCart });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Item removido com sucesso" });
            } else {
                res.status(404).json({ message: "Item não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o Item" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    getCarts: async (req, res) => {
        try {
             const result = await cart.findOne({ codCart: req.body.codCart });
             if (!result) {
                 res.status(404).json({ message: "Item não encontrado" });
             } else {
                 res.status(200).json(result);
             }
         } catch (err) {
             res.status(500).json({ message: "Não foi possível recuperar o Item no momento" });
        }
  },
  updateCart: async (req, res) => {
    if (req.user.permission === 10) { 
        try {
            const result = await cart.updateOne({ codCart: req.body.codCart }, req.body);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Item atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Item não encontrado para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
},
createCart: async (req, res) => {
    try {
    
      const { produtos, cpf, orderTotal } = req.body;

      if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
        return res.status(400).json({ message: "Lista de livros inválida" });
      }


      const newCart = await cart.create({ produtos, cpf, orderTotal});
  
      res.status(200).json({ message: "Compra finalizada com sucesso", Cart: newCart });
    } catch (err) {
      res.status(500).json({ message: `Não foi possível criar o carrinho: ${err.message}` });
    }
  },
  searchMyOrders: async (req, res) => {
    const { cpf } = req.query;
try {
    const carts = await cart.find({ cpf: { $regex: new RegExp(cpf, 'i') } }).select(['-__v', '-_id']);

    res.status(200).json(carts);
} catch (err) {
    res.status(500).json({ message: 'Erro ao pesquisar pedidos', error: err.message });
}
  },
};
