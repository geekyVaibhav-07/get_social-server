/**
 * status can have 3 values: 1 for success, 0 for operation errors, -1 for server errors
 */


const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        err: err,
        stack: err.stack,
    });
};

const prodError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong !!!',
        });
    }
};

const globalErrorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 0;

    if (process.env.NODE_ENV === 'development') {
        devError(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        prodError(err, res);
    }
};

module.exports = globalErrorController;
