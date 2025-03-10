import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name should have at least {#limit} characters.",
    "string.max": "Name should not exceed {#limit} characters.",
  }),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email address (e.g., user@gmail.com).",
    }),
  password: joi
    .string()
    .trim()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must have at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const loginSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email address.",
    }),
  password: joi.string().trim().required().messages({
    "string.empty": "Password is required.",
  }),
});

export { registerSchema, loginSchema };
