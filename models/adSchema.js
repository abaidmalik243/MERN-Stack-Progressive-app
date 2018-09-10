var mongoose = require('mongoose');
var adScheema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    titleAd: {
        type: String,
        require: true
    },
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    modal: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'province'
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    },
    productImage: {
        type: String
    }

});
module.exports = mongoose.model('ad', adScheema);