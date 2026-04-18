const Joi = require('joi');

const nameRegex = /^[A-Za-z]+$/;

const createDogSchema = Joi.object({
  breed: Joi.string()
    .trim()
    .regex(nameRegex)
    .required()
    .min(3)
    .messages({
      'string.empty': 'Breed is required',
      'any.required': 'Breed is required',
      'string.pattern.base': 'Breed must contain only alphabets',
      'string.min': 'Breed must be at least 3 characters long',
    }),

  subBreeds: Joi.array()
    .items(
      Joi.string()
        .trim()
        .regex(nameRegex)
        .min(3)
        .messages({
          'string.empty': 'SubBreed is required',
          'string.min': 'SubBreed must be at least 3 characters long',
          'string.pattern.base': 'SubBreed must contain only alphabets'
        })
    )
    .unique()
    .optional()
});

const updateDogSchema = Joi.object({
  subBreeds: Joi.array()
    .items(
      Joi.string()
        .trim()
        .regex(nameRegex)
        .min(3)
        .messages({
          'string.min': 'SubBreed must be at least 3 characters long',
          'string.pattern.base': 'SubBreed must contain only alphabets'
        })
    )
    .unique()
    .optional()
});

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),

  breed: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .optional()
    .messages({
      'string.min': 'Breed must be at least 3 characters. Enter a correct value',
      'string.pattern.base': 'Breed must contain only alphabets'
    }),

  subBreed: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .optional()
    .messages({
      'string.min': 'SubBreed must be at least 3 characters. Enter a correct value',
      'string.pattern.base': 'SubBreed must contain only alphabets'
    })
});

module.exports = {
  createDogSchema,
  updateDogSchema,
  querySchema
};