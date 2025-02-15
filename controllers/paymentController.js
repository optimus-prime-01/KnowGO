const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    try {
        const { orderId, userId, amount, currency, thirdPartyPaymentId, status } = req.body;
        const newPayment = await Payment.create({
            orderId,
            userId,
            amount,
            currency,
            thirdPartyPaymentId,
            status
        });
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findOne({ PaymentId: req.params.paymentId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

