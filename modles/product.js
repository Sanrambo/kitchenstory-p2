const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);


//initialize slug
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: "placeholder.jpg"
    },
    slug: {

        type: String,
        slug: "name",
        unique: true,
        slug_padding_size: 2
    }

});



module.exports = mongoose.model('Product', productSchema);