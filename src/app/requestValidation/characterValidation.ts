import Joi from '@hapi/joi';

const genders = ['Male', 'Female', 'Non-Binary', 'Others'];
export const newCharacterSchema = Joi.object({
    body: {
        realName: Joi.string().trim().optional(),
        name: Joi.string().trim().required(),
        gender: Joi.valid(...genders).optional(),
        bio: Joi.string().trim().optional(),
        aliases: Joi.array().items(Joi.string()).optional(),
        abilities: Joi.array().items(Joi.string()).optional(),
        dateOfBirth: Joi.date().optional(),
        dateOfDeath: Joi.date().optional()
    }
});

export const updateCharacterSchema = Joi.object({
    params: {
        id: Joi.string().uuid({ version: 'uuidv4' }).required()
    },
    body: {
        realName: Joi.string().trim().optional(),
        name: Joi.string().trim().optional(),
        gender: Joi.valid(...genders).optional(),
        bio: Joi.string().trim().optional(),
        aliases: Joi.array().items(Joi.string()).optional(),
        abilities: Joi.array().items(Joi.string()).optional(),
        dateOfBirth: Joi.date().optional(),
        dateOfDeath: Joi.date().optional()
    }
});