const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    odId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['X', 'Y', 'Z'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    situation: {
        type: String,
        required: true
    }
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;

