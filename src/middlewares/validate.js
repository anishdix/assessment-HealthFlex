//validate middle ware to check joi validation

const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError'); 

const validate = (schema) => (req, res, next) => {
  try {
    const validSchema = ['params', 'query', 'body'].reduce((acc, key) => {
      if (schema[key]) {
        acc[key] = schema[key];
      }
      return acc;
    }, {});
    
    const object = ['params', 'query', 'body'].reduce((acc, key) => {
      if (schema[key]) {
        acc[key] = req[key];
      }
      return acc;
    }, {});
    
    const { error } = Joi.compile(validSchema).validate(object, { abortEarly: false });
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, message));
    }
    Object.assign(req, object);
    next();
  } catch (error) {
    console.error('Validation error:', error);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Validation failed'));
  }
};

module.exports = validate;
