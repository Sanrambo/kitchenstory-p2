const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);


//initialize slug
mongoose.plugin(slug);

const cartSchema = new mongoose.Schema({
    userId: {

        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productAmount: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImg: {
        type: String,
        default: "placeholder.jpg"
    },


});



module.exports = mongoose.model('Cart', cartSchema);