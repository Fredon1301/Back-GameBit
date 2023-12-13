const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: { type: Number, default: 1, enum: ['1', '10'] }
});

module.exports = mongoose.model('User', userSchema);
