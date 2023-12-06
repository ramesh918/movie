import Joi from 'joi';
export const loginValidationSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be valid',
        }),
    password: Joi.string()
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})',
            )
        )
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.pattern.base': 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special symbol',
        }),
});
