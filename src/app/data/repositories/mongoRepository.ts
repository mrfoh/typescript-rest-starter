import { injectable, unmanaged } from 'inversify';
import { Model, model, Query } from 'mongoose';
import { MongoModel, IMongoModel } from '../models/mongoModel';
import { IMongoRepositoryInterface, PaginatedResult, QueryOptions, PaginationOptions } from './mongoRepositoryInterface';
import { ModelNotFoundError, SoftDeleteNotSupportedError } from './mongoRepositoryErrors';
const mongooseHidden = require('mongoose-hidden')();


@injectable()
export abstract class MongoRepository<T extends IMongoModel> implements IMongoRepositoryInterface<T> {
    private name: string;
    private model: Model<T>;
    private schema: MongoModel;

    constructor(
        @unmanaged() name: string,
        @unmanaged() schema: MongoModel
    ) {
        this.schema = schema;
        this.schema
            .set('toJSON', { virtuals: true, getters: true })
            .plugin(mongooseHidden);

        this.name = name;
        this.model = model<T>(this.name, schema);
    }
    /**
     * Archive a model
     * @param {string} id
     */
    async archive(id: string) {
        try {
            const model = await this.model.findOne().where('_id', id);
            const supportsSoftDeletes = this.schema.options!.softDeletes;

            if (!model) {
                throw new ModelNotFoundError(`${this.name} not found`);
            }

            if (!supportsSoftDeletes) {
                throw new SoftDeleteNotSupportedError(`${this.name} does not support soft deletes. Use the delete method instead`);
            }

            model.deleted = true;
            model.deletedAt = new Date();

            return await model.save();
        } catch (error) {
            throw error;
        }
    }
    /**
     * Fetch all models
     * @param {QueryOptions} options
     * @returns {Promise<T[] | PaginatedResult<T>>}
     */
    async all(options: QueryOptions): Promise<T[] | PaginatedResult<T>> {
        try {
            const {
                archived,
                conditions,
                select,
                sortBy = 'createdAt',
                sortOrder = 'ascending',
                populate,
                perPage = 20,
                page = 1
            } = options;
            conditions.deletedAt = archived === true || archived === 'true'
                ? { $ne: null }
                : { $eq: null };
            const total = await this.model.countDocuments(conditions);
            const query = this.model.find(conditions);

            if (populate && populate.length > 0) {
                populate.forEach(_populate => {
                    query.populate(_populate.path, _populate.select);
                });
            }

            query
                .select(select)
                .sort({
                    [sortBy]: sortOrder
                });

            return !perPage
                ? await query.exec()
                : await this.paginate(query, { total, perPage, page });
        } catch (error) {
            throw error;
        }
    }
    /**
     * Create a model
     * @param {any} attrs
     * @returns {Promise<T>}
     */
    async create(attributes: any): Promise<T> {
        try {
            const model = await this.model.create(attributes);
            return model;
        } catch (error) {
            throw error;
        }
    }
    /**
     * Delete a model
     * @param {String} id
     * @returns {Promise<T>}
     */
    async delete(id: string): Promise<T> {
        try {
            const model = this.getOneById(id);
            return await (await model).remove();
        } catch (error) {
            throw error;
        }
    }
    /**
     * Fetch model by _id field
     * @param {string} id
     * @returns {Promise<T>}
     */
    async getOneById(id: string): Promise<T> {
        try {
            const model = await this.model.findOne().where('_id', id).exec();
            if (!model || model && model.deleted) throw new ModelNotFoundError(`${this.name} not found`);
            return model;
        } catch (error) {
            throw error;
        }
    }
    /**
     * Fetch model by field
     * @param {string} field
     * @param {any} value
     * @returns {Promise<T | null>}
     */
    async getOneByField(field: string, value: any): Promise<T | null> {
        try {
            const model = await this.model.findOne().where(field, value).exec();
            return model;
        } catch (error) {
            throw error;
        }
    }
    /**
     * Update a model
     * @param {string} id
     * @param {any} attrs
     * @returns {Promise<T>}
     */
    async update(id: string, attrs: any): Promise<T> {
        try {
            const model = await this.model.findByIdAndUpdate(id, attrs, { new: true });
            if (!model) throw new ModelNotFoundError(`${this.name} not found`);
            return model;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Paginate a model query
     * @param {Query<any>} query
     * @param {PaginationOptions} options
     */
    async paginate(query: Query<any>, options: PaginationOptions): Promise<PaginatedResult<T>> {
        try {
            const offset = options.page && options.page > 0
                ? (options.page - 1) * options.perPage
                : 0;
            const limit = options.perPage;
            const total = options.total;
            const pages = Math.ceil(total / limit);
            const docs = await query.skip(offset).limit(limit).exec() || [];

            return {
                pagination: {
                    total,
                    perPage: limit,
                    page: options.page,
                    pages
                },
                data: docs
            };
        } catch (error) {
            throw error;
        }
    }
    /**
     * Restored an archived model
     * @param {string} id
     * @returns {Promise<T>}
     */
    async restore(id: string): Promise<T> {
        try {
            const model = await this.getOneById(id);

            if (model && !model.deleted || !model.deletedAt) {
               return model;
            } else {
                model!.deletedAt = null;
                model.deleted = false;
                return await model.save();
            }
        } catch (error) {
            throw error;
        }
    }
}