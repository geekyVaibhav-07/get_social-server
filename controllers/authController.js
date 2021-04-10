const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userModel = require('../models/userModel');
const { asyncCatch, AppError } = require('../utils/error');
const { errorConstants, userConstants, successConstants } = require('../constants/constants');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});

const createSendToken = (req = {}, res) => {
    const jwtCookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') jwtCookieOptions.secure = true;
    const { id } = req.user;
    const token = signToken(id);
    res.cookie('jwt', token, jwtCookieOptions);
    res.status(200).json({
        status: 1,
        message: {
            type: successConstants.AUTHENTICATED
        },
        token,
    });
};

const protect = asyncCatch(async (req, res, next) => {
    let token;
    if (
        req.headers
        && req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const message = {
            type: errorConstants.NOT_AUTHENTICATED
        }
        return next(new AppError(message, 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await userModel.getUserById({ id: decoded.id });
    if (!freshUser) {
        return next(new AppError('User no longer exists !!!', 401));
    }

    // to be implemented

    //   if (freshUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //       new AppError(
    //         "Your password has been changed recently, please login again !!!",
    //         401
    //       )
    //     );
    //   }

    req.user = freshUser[0];
    next();
});

module.exports = {
    authToken: createSendToken,
    protect
}
