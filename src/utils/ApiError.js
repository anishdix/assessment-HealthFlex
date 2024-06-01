//instance of error class so it easier to read http error message with codes using htttp-status libary

class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = ApiError;
  