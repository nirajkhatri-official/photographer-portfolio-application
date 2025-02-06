import { loginSchema, signupSchema } from "../validators/authValidation.js";

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce((acc, curr) => {
      const key = curr.path[0];
      acc[key] = curr.message;
      return acc;
    }, {});

    const filteredErrors = Object.keys(errors).reduce((acc, key) => {
      if (errors[key]) {
        acc[key] = errors[key];
      }
      return acc;
    }, {});

    const response = {
      error: true,
      form_error: filteredErrors,
    };

    return res.status(400).json(response);
  }

  next();
};

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce((acc, curr) => {
      const key = curr.path[0];
      acc[key] = curr.message;
      return acc;
    }, {});

    const filteredErrors = Object.keys(errors).reduce((acc, key) => {
      if (errors[key]) {
        acc[key] = errors[key];
      }
      return acc;
    }, {});

    const response = {
      error: true,
      form_error: filteredErrors,
    };

    return res.status(400).json(response);
  }

  next();
};

export { validateLogin, validateSignup };
