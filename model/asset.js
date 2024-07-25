const mongoose = require('mongoose');

var assetSchema = mongoose.Schema({
    file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file',
    },
    access_price: {
        type: Number
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

var asset = mongoose.model('asset', assetSchema);

module.exports = asset;