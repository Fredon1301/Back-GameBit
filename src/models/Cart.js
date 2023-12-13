const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cpf: { type: String, required: true },
  produtos: [{
    codProduct: {
      type: String,
      required: true,
    },
    productAttributes: {
      name: {
        type: String,
        required: true,
      },
      currentPrice: {
        type: Number,
        required: true,
      },
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderTotal: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model("Cart", cartSchema);
