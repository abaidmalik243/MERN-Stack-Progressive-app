const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fvtSchema = new Schema({
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ad'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('fvt', fvtSchema);