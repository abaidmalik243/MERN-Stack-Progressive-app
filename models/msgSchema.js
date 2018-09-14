var mongoose = require('mongoose');
var msgScheema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ad'
    },
    name: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    msg: {
        type: String,
        require: true
    },



});
module.exports = mongoose.model('msg', msgScheema);