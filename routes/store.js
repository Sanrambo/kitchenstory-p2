const { request } = require('express');
const express = require('express');
const router = express.Router();
const product = require('./../modles/product');
const cart = require('./../modles/cart');

router.get('/addProduct', (req, res) => {
    res.render('new');

});

router.get('/cart', (req, res) => {
    res.render('cart');

})

router.get('/:slug', async (req, res) => {

    let Product = await product.findOne({ slug: req.params.slug });

    if (Product) {
        res.redirect('/');
    }
})
//router that handles addign new product    
router.post('/', async (req, res) => {
    //console.log(req.body);
    let Product = new product({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        img: req.body.img

    });

    try {
        Product = await Product.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

router.post('/:id', async (req, res) => {
    await product.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.post('/cart/delete/:id', async (req, res) => {
    await cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
});

//data from Products to Cart
router.post('/cart/:id', async (req, res) => {


    const fromProduct = await product.findById(req.params.id).exec();

    //console.log(fromProduct);


    let Cart = new cart({

        userId: fromProduct.id,
        productName: fromProduct.name,
        productAmount: fromProduct.amount,
        productPrice: fromProduct.price,

    });


    try {
        let cartItems = await Cart.save();
        // console.log(cartItems);
        res.redirect('/#main-content');
    } catch (error) {
        console.log(error);
    }


});



module.exports = router;
