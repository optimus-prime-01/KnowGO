const User = require('../models/User');

exports.createUser = async ({
    firstName, lastName, email, password, dob, userType, contactNumber
}) => {
    if (!firstName || !email || !password || !contactNumber) {
        throw new Error('Required fields are missing');
    }
    
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        dob,
        userType,
        contactNumber
    })

    return user;
}

