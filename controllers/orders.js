const Order = require('../models/order');
const User = require('../models/user');

module.exports = (app) => {

    app.get('/', async (req, res) => {
        try {
            const currentUser = await req.user;
            console.log(currentUser);
            const orders = await Order.find({}).lean().populate('author');
            return res.render('orders-index', { orders, currentUser });
        } catch (err) {
            console.log(err.message);
        };
    });

    // NEW POST
    app.get('/orders/new', (req, res) => {
        if (req.user) {
            const currentUser = req.user;
            res.render('orders-new', { currentUser });
        } else {
            console.log('unauthorized');
            res.render('error', { errorMessage:'You need to be logged in to see this page.' });
            return res.status(401); // UNAUTHORIZED
        };
    });

    app.post('/orders/new', (req, res) => {
        if (req.user) {
            const userId = req.user._id;
            const order = new Order(req.body);
            order.author = userId;

            order.save().then(() => User.findById(userId)).then((user) => {
                user.orders.unshift(post);
                user.save();
                return res.redirect(`/orders/${order._id}`);
            }).catch((err) => {
                console.log(err.message);
            });
        } else {
            res.render('error', { errorMessage:'You need to be logged in to see this page.' })
            return res.status(401); // UNAUTHORIZED
        };
    });

    app.get('/orders/:id', (req, res) => {
        const currentUser = req.user;
        Order.findById(req.params.id).populate('comments').lean()
        .then((post) => {
            res.render('orders-show', { post, currentUser })
        })
        .catch((err) => {
            console.log(err.message);
        });
    });
}