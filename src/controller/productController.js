const Product = require('../models/Product');
const jwtService = require('jsonwebtoken');
const user = require('../models/User')

module.exports = {
    getProduct: (req, res) => {
        Product.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os Livros" });
        });
    },
    deleteProduct: async (req, res) => {
        if (req.user.permission === 10) {
        try {
            const result = await Product.deleteOne({ codProduct: req.body.codProduct });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Livro removido com sucesso" });
            } else {
                res.status(404).json({ message: "Livro não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o Livro" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    getProducts: async (req, res) => {
        try {
             const result = await Product.findOne({ codProduct: req.body.codProduct });
             if (!result) {
                 res.status(404).json({ message: "Livro não encontrado" });
             } else {
                 res.status(200).json(result);
             }
         } catch (err) {
             res.status(500).json({ message: "Não foi possível recuperar o Livro no momento" });
        }
  },
  updateProduct: async (req, res) => {
    if (req.user.permission === 10) { 
        try {
            const result = await Product.updateOne({ codProduct: req.body.codProduct }, req.body);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Livro atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Livro não encontrado para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
},
    createProduct: async (req, res) => {
        if (req.user.permission === 10) {
            try {  
                const result = await Product.create(req.body);
                res.status(201).json({ message: `O Livro ${result._doc.name} foi criado com sucesso` });
        } catch (err) {
            res.status(500).json({ message: `Não foi possível criar o Livro ${req.body.name}` });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    searchProductsByName: async (req, res) => {
        const { name } = req.query;
        try {
            const Products = await Product.find({ name: { $regex: new RegExp(name, 'i') } }).select(['-__v', '-_id']);
      
            res.status(200).json(Products);
          } catch (err) {
            res.status(500).json({ message: 'Erro ao pesquisar livros', error: err.message });
          }
        },
};

