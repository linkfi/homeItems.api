const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name : String,
    manufacturer : String,
    count : Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);

