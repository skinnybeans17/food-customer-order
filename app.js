require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

require('./data/db');

const checkAuth = require('./middleware/checkAuth');
app.use(checkAuth);

const orders = require('./controllers/orders.js')(app);
const users = require('./controllers/auth.js')(app);
const auth = require('./controllers/auth.js')(app);

app.get('/', (req, res) => {
    res.render('orders-index');
});

app.listen(3000);

module.exports = app;