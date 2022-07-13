const Order = require('../models/order');
const User = require('../models/user');

module.exports = (app) => {
    app.get('/users/:username', (req, res) => {
        User.findOne({ username: req.params.username }).lean().then((this_user) => {
            Order.find({ author: this_user }).lean().then((orders) => {
                res.render('users-show', { this_user, orders });
            });
        });
    });
};