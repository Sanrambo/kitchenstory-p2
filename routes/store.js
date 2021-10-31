const { request } = require('express');
const express = require('express');
const router = express.Router();
const product = require('./../modles/product');
const cart = require('./../modles/cart');
const multer = require('multer');

//define storage for the uploaded img
const storage = multer.diskStorage({

    //file destionation
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },

    //add the extension
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

//parameters for multar
const upload = multer({
    storage: storage,
    limit: {
        fieldSize: 1024 * 1024 * 3,
    },
})

// Rendering adding new item page
router.get('/addProduct', (req, res) => {
    res.render('new');

});

// Rendering cart page
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
router.post('/', upload.single('image'), async (req, res) => {
    //console.log(req.file);
    let Product = new product({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        img: req.file.filename,

    });

    try {
        Product = await Product.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

// post to handle deletion from prodcuts table
router.post('/:id', async (req, res) => {
    await product.findByIdAndDelete(req.params.id);
    res.redirect('/#products-list');
});

// post to handle deletion from cart table
router.post('/cart/delete/:id', async (req, res) => {
    await cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
});

//data from Products to Cart
router.post('/cart/:id', async (req, res) => {


    //Added exec() to return promise
    const fromProduct = await product.findById(req.params.id).exec();

    //console.log(fromProduct);


    let Cart = new cart({

        userId: fromProduct.id,
        productName: fromProduct.name,
        productAmount: fromProduct.amount,
        productPrice: fromProduct.price,
        productImg: fromProduct.img,

    });


    try {
        let cartItems = await Cart.save();
        // console.log(cartItems);
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
    }


});



module.exports = router;
