const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

exports.createOrder = async (req, res) => {
    try {
        const { customerId, partnerId, orderDetail, status } = req.body;

        const newOrderDetail = await OrderDetail.create(orderDetail);

        const newOrder = await Order.create({
            customerId,
            partnerId,
            orderDetailId: newOrderDetail._id,
            status
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
            .populate('customerId')
            .populate('partnerId')
            .populate('orderDetailId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

