const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    food:  { type: String, required: true },
    drink: { type: String, required: true },
    condiment: { type: String, required: true },
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = model('Order', orderSchema);