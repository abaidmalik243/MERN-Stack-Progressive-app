var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    subscription: {
        type: String
    }

});
module.exports = mongoose.model('subscription', notificationSchema);