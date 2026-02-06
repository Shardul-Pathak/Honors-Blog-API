import { signupValidation, loginValidation } from '../validators/authValidation.js';

export function validateSignup(req, res, next) {
  const { error, value } = signupValidation.validate(req.body);

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

export function validateLogin(req, res, next) {
  const { error, value } = loginValidation.validate(req.body);

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
