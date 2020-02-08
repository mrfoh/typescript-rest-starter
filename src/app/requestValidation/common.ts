import Joi from '@hapi/joi';

const order = ['ascending', 'descending'];

export const fetchAllSchema = Joi.object({
    query: {
        perPage: Joi.number().optional(),
        page: Joi.number().optional(),
        sortBy: Joi.string().trim().optional(),
        sortOrder: Joi.string().valid(...order).optional()
    }
});

export const fetchOneSchema = Joi.object({
    params: {
        id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
})