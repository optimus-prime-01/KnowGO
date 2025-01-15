const UserAddress = require('../models/UserAddress');

exports.addUserAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        const newAddress = await UserAddress.create({ userId, address });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserAddresses = async (req, res) => {
    try {
        const addresses = await UserAddress.find({ userId: req.params.userId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

