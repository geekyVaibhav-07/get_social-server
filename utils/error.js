/**
 * AppError extends to Error and adds more details to the error thowon whcih will be catched by asyncCatch 
 * and further forwared to globalErrorController
 */

class AppError extends Error {
    constructor(message, statusCode) {
        super(message.type);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = `${statusCode}`.startsWith('4') ? '0' : '-1';
        this.detail = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * asyncCatch is like and HOC/wrapper which adds the catch to allt he enclosing functions
 */

const asyncCatch = (fn) => {
    return (req, res, next) => fn(req, res, next).catch((err) => next(err));
};

module.exports = {
    AppError,
    asyncCatch
}
