const User = require('../models/User');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, dob, userType, contactNumber } = req.body;

    const isUserAlready = await User.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await User.hashPassword(password);

    try {
        const user = await userService.createUser({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob,
            userType,
            contactNumber
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
}

exports.logoutUser = async (req, res, next) => {
    res.status(200).json({ message: 'Logged out' });
}

