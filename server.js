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

//Adding items to product table
app.get('/', async (req, res) => {

    let products = await Product.find();

    res.render('index', { products: products });
});

//Add products to cart
app.get('/cart', async (req, res) => {


    let cartItems = await Cart.find();

    // Aggregation to calculate the sum prices of added products on the cart
    let priceSum = await Cart.aggregate([{ $group: { _id: null, productPrice: { $sum: "$productPrice" } } }]);

    if (!priceSum.length) {
        priceSum = 0
    }


    res.render('cart', { cartItems: cartItems, priceSum: priceSum });
});


app.use(express.static("public"))
app.use('/store', storeRouter);

app.listen(5000);
