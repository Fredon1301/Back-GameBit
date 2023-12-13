    const Profile = require('../models/Profile');
const jwtService = require('jsonwebtoken');
const user = require('../models/User')

module.exports = {
    getProfile: (req, res) => {
        Profile.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os documentos" });
        });
    },
    deleteProfile: async (req, res) => {
        if (req.user.permission === 10) {
        try {
            const result = await Profile.deleteOne({ codProfile: req.body.codProfile });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "documento removido com sucesso" });
            } else {
                res.status(404).json({ message: "documento não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o documento" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    getProfiles: async (req, res) => {
        try {
             const result = await Profile.findOne({ codProfile: req.body.codProfile });
             if (!result) {
                 res.status(404).json({ message: "documento não encontrado" });
             } else {
                 res.status(200).json(result);
             }
         } catch (err) {
             res.status(500).json({ message: "Não foi possível recuperar o documento no momento" });
        }
  },
  updateProfile: async (req, res) => {
    if (req.user.permission === 10) { 
        try {
            const result = await Profile.updateOne({ codProfile: req.body.codProfile }, req.body);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "documento atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "documento não encontrado para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
},
createProfile: async (req, res) => {
    if (req.user.permission === 10 || req.user.permission === 1) {
        try {  
            const imagePath = await req.file.path;
            const newProfile = new Profile({ profileImage: imagePath });
            await newProfile.save();
            res.status(201).json({ message: 'A foto foi enviada com sucesso' });
        } catch (err) {
            res.status(500).json({ message: `Não foi possível criar o documento ${req.body.name}` });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
},
    searchProfilesByName: async (req, res) => {
        const { name } = req.query;
        try {
            const Profiles = await Profile.find({ name: { $regex: new RegExp(name, 'i') } }).select(['-__v', '-_id']);
      
            res.status(200).json(Profiles);
          } catch (err) {
            res.status(500).json({ message: 'Erro ao pesquisar documentos', error: err.message });
          }
        },
};

