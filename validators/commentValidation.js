import Joi from 'joi';

export const createCommentValidation = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required(),
});

export const updateCommentValidation = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000),
}).min(1);
