const mongoose = require('mongoose');

//creating the schema of shopping item
const ItemSchema = mongoose.Schema({
    // Id: String,
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('ShoppingItem', ItemSchema);