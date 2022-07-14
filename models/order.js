const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

const orderSchema = new Schema({
    food:  { type: String, required: true },
    drink: { type: String, required: true },
    condiment: { type: String, required: true },
    author:   { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

orderSchema
	.pre('findOne', Populate('author'))
	.pre('find', Populate('author'));

module.exports = model('Order', orderSchema);