const mongoose = require('mongoose');

var uploadSchema = mongoose.Schema({
    minted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content_id: {
        type: String,
    },
    content_name: {
        type: String
    },
    content_description: {
        type: String
    },
    content_hash: {
        type: String
    },
    content_ipfs_url: {
        type: String
    },
    description: {
        type: String
    },
    transactionHash: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

var upload = mongoose.model('file', uploadSchema);

module.exports = upload;