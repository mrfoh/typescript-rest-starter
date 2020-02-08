import Joi from '@hapi/joi';

const genders = ['Male', 'Female', 'Non-Binary', 'Others'];
export const newCharacterSchema = Joi.object({
    body: {
        realName: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        gender: Joi.valid(...genders).optional(),
        bio: Joi.string().trim().optional(),
        aliases: Joi.array().items(Joi.string()).optional(),
        dateOfBirth: Joi.date().optional(),
        dateOfDeath: Joi.date().optional()
    }
});