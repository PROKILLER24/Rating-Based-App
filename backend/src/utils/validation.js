// Validation utilities using Joi
// Location: backend/src/utils/validation.js

const Joi = require('joi');

// Validation schemas
const schemas = {
  // User registration/login validation
  register: Joi.object({
    name: Joi.string().min(20).max(60).required().messages({
      'string.min': 'Name must be at least 20 characters',
      'string.max': 'Name must not exceed 60 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string()
      .min(8)
      .max(16)
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must not exceed 16 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one special character',
        'any.required': 'Password is required',
      }),
    address: Joi.string().max(400).allow(null, '').messages({
      'string.max': 'Address must not exceed 400 characters',
    }),
    role: Joi.string().valid('USER', 'ADMIN', 'OWNER').optional(),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),

  updatePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Current password is required',
    }),
    newPassword: Joi.string()
      .min(8)
      .max(16)
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must not exceed 16 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one special character',
        'any.required': 'New password is required',
      }),
  }),

  // Store validation
  createStore: Joi.object({
    name: Joi.string().min(20).max(60).required().messages({
      'string.min': 'Store name must be at least 20 characters',
      'string.max': 'Store name must not exceed 60 characters',
      'any.required': 'Store name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    address: Joi.string().max(400).required().messages({
      'string.max': 'Address must not exceed 400 characters',
      'any.required': 'Address is required',
    }),
  }),

  updateStore: Joi.object({
    name: Joi.string().min(20).max(60).optional(),
    email: Joi.string().email().optional(),
    address: Joi.string().max(400).optional(),
  }),

  // Rating validation
  createRating: Joi.object({
    storeId: Joi.number().integer().positive().required().messages({
      'number.base': 'Store ID must be a number',
      'any.required': 'Store ID is required',
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
      'any.required': 'Rating is required',
    }),
  }),

  updateRating: Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
      'any.required': 'Rating is required',
    }),
  }),

  // Query params validation (for filtering and sorting)
  queryParams: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('asc', 'desc').optional(),
    search: Joi.string().optional(),
    role: Joi.string().valid('ADMIN', 'USER', 'OWNER').optional(),
  }),
};

/**
 * Validate request data against a schema
 * @param {Object} schema - Joi schema
 * @param {String} property - Request property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = {
  schemas,
  validate,
};

