import Joi from '@hapi/joi';

export const newAccountSchema = Joi.object({
    body: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(6).trim().required(),
        firstName: Joi.string().trim().optional(),
        lastName: Joi.string().trim().optional(),
        phoneNumber: Joi.string().trim().optional()
    }
});