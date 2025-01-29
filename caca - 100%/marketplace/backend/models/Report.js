const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Report', ReportSchema);