const express = require('express');
const storeRouter = require('./routes/store');
const Product = require('./modles/product');
const Cart = require('./modles/cart');

//adding mongoose
const mongoose = require('mongoose');
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/eShop');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {

    let products = await Product.find();

    res.render('index', { products: products });
});


app.get('/cart', async (req, res) => {

    let cartItems = await Cart.find();

    res.render('cart', { cartItems: cartItems });
});


app.use(express.static("public"))
app.use('/store', storeRouter);

app.listen(5000);
