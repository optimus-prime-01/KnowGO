const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const userAddressController = require('../controllers/userAddressController');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('contactNumber').isNumeric().withMessage('Contact number must be numeric'),
    body('userType').isIn(['Admin', 'Customer', 'Partner']).withMessage('Invalid user type')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

// New routes
router.post('/order', authMiddleware.authUser, orderController.createOrder);
router.get('/order/:orderId', authMiddleware.authUser, orderController.getOrder);

router.post('/address', authMiddleware.authUser, userAddressController.addUserAddress);
router.get('/address/:userId', authMiddleware.authUser, userAddressController.getUserAddresses);

router.post('/payment', authMiddleware.authUser, paymentController.createPayment);
router.get('/payment/:paymentId', authMiddleware.authUser, paymentController.getPayment);

module.exports = router;

