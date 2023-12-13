const user = require('../models/User');
const jwtService = require('jsonwebtoken');

module.exports = {
    getUsers: (req, res) => {
        if (req.user.permission === 10) {


            user.find({}).select(["-__v", "-_id"]).then((result) => {
                res.status(200).json(result);
            }).catch(() => {
                res.status(500).json({ message: "Não foi possível recuperar os usuários" })
            });
        } else {
            res.status(403).json({ message: "Você precisa ser um administrador para visualizar os usuários do sistema" })
        }
    },
    deleteUser: async (req, res) => {
        if (req.user.permission === 10) {
            try {
                const result = await user.deleteOne({ cpf: req.body.cpf });
                if (result.deletedCount > 0) {
                    res.status(200).json({ message: "Usuario removido com sucesso" });
                } else {
                    res.status(404).json({ message: "Usuario não encontrado para remoção" });
                }
            } catch (err) {
                res.status(500).json({ message: "Não foi possível remover o usuario" });
            }
        } else {
            res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });

        }
    },
    getUser: async (req, res) => {
        try {
            const result = await user.findOne({ cpf: req.body.cpf });
            if (!result) {
                res.status(404).json({ message: "Usuário não encontrado" });
            } else {
                res.status(200).json(result);
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível recuperar o usuário no momento" });
        }
    },
    updateUser: async (req, res) => {
        if (req.user.permission === 10) {
            try {
                const result = await user.updateOne({ cpf: req.body.cpf }, req.body);
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: "Usuário atualizado com sucesso" });
                } else {
                    res.status(404).json({ message: "Usuário não encontrado para atualização" })
                }
            } catch (err) {
                res.status(500).json({ message: "Não foi possível atualizar os dados" })
            }
        } else {
            res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
        }
    },
    createUser: async (req, res) => {
        try {
            const result = await user.create(req.body);
            res.status(201).json({ message: `O ${result._doc.name} foi criado com sucesso` });
        } catch (err) {
            console.error('Erro ao criar usuário:', err);
            res.status(500).json({ message: `Não foi possível criar o usuário ${req.body.name}`, error: err.message });
        }
    },

    login: async (req, res) => {
        const result = await user.findOne({ email: req.body.email, password: req.body.password });
        if (!result) {
            res.status(401).json({ message: "Credenciais inválidas" });
        } else {
            const secret = process.env.SECRET;
            const payload = {
                id: result._id,
                email: result.email,
                permission: result.permission,
                cpf: result.cpf

            };
            console.log(result.name)

            jwtService.sign(payload, secret, (err, token) => {
                if (err) {
                    res.status(401).json({ message: "Não foi possível autenticar" });
                } else {
                    res.status(201).json({ "Access-Token": token, "userData": result.name });
                } 
            });
        }
    }

};
