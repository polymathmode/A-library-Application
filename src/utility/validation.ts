import Joi from 'joi';

// Joi schema for user validation
export const userValidationSchema = Joi.object({

  first_name: Joi.string().required().label('First Name'),

  last_name: Joi.string().required().label('Last Name'),

  email: Joi.string().email().required().label('Email'),

  password: Joi.string().allow('').label('Password'),

  role: Joi.string().label('Role'),
  
  books: Joi.array().items(Joi.object()).label('Books'),
});