import { createCommentValidation, updateCommentValidation } from '../validators/commentValidation.js';

export function validateCreateComment(req, res, next) {
  const { error, value } = createCommentValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages,
    });
  }

  req.body = value;
  next();
}

export function validateUpdateComment(req, res, next) {
  const { error, value } = updateCommentValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages,
    });
  }

  req.body = value;
  next();
}
