import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional().allow("", null),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export { loginSchema, signupSchema };
