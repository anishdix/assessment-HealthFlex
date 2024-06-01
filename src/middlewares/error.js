//error handler ,Send response on errors 

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!statusCode) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });

};

module.exports = {
    errorHandler,
};