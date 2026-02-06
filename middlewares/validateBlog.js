import { createBlogValidation, updateBlogValidation } from '../validators/blogValidation.js';

export function validateCreateBlog(req, res, next) {
  const { error, value } = createBlogValidation.validate(req.body);

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

export function validateUpdateBlog(req, res, next) {
  const { error, value } = updateBlogValidation.validate(req.body);

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
