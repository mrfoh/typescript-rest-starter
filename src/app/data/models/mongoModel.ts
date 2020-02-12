import { Schema, SchemaDefinition, SchemaTypes, SchemaOptions, Document } from 'mongoose';
import { COMMON_SCHEMAS } from './commonMongoSchemas';
import { merge } from 'lodash';

export interface MongoModelOptions extends SchemaOptions {
    /**
     * Use UUID is primary key
     */
    useUUID: boolean | true;
    /**
     * Allow soft deletes
     */
    softDeletes: boolean | true;
    hidden: string[] | [];
}

export interface IMongoModel extends Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    deleted?: boolean | false;
}

export class MongoModel extends Schema {
    options?: MongoModelOptions;
    /**
     * Base Schema
     * @param {SchemaDefinition} definition
     * @param {BaseSchemaOptions} options
     */
    constructor(definition?: SchemaDefinition, options?: MongoModelOptions) {
        const defaultSchemaOptions: SchemaOptions = {
            timestamps: {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            },
            id: true
        };

        const defaultDefinition = {
            ...options!.useUUID && { _id: COMMON_SCHEMAS.PRIMARY_ID },
            ...options!.softDeletes && {
                deleted: false,
                deletedAt: SchemaTypes.Date
            },
            createdAt: SchemaTypes.Date,
            updatedAt: SchemaTypes.Date
        };

        super(
            merge(definition || {}, defaultDefinition),
            merge(options || {}, defaultSchemaOptions)
        );

        this.options = options;
    }
}