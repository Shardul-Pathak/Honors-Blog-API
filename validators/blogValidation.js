import Joi from 'joi';

export const createBlogValidation = Joi.object({
  title: Joi.string()
    .min(5)
    .max(200)
    .required(),

  content: Joi.string()
    .min(10)
    .required(),
});

export const updateBlogValidation = Joi.object({
  title: Joi.string()
    .min(5)
    .max(200),

  content: Joi.string()
    .min(10),
}).min(1);
