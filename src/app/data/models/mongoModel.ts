import { Schema, SchemaDefinition, SchemaTypes, SchemaOptions, Document } from 'mongoose';
import { COMMON_SCHEMAS } from './commonMongoSchemas';
import { merge } from 'lodash';

export interface MongoModelOptions extends SchemaOptions {
    /**
     * Use UUID is primary key
     */
    useUUID?: boolean | false;
    /**
     * Fields to hidde
     */
    hidden?: string[];
}

export interface IMongoModel extends Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted?: boolean;
}

export class MongoModel extends Schema {
    /**
     * Base Schema
     * @param {SchemaDefinition} definition
     * @param {BaseSchemaOptions} options
     */
    constructor(definition?: SchemaDefinition, options?: MongoModelOptions) {
        const defaultSchemaOptions: MongoModelOptions = {
            timestamps: {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            }
        };

        const defaultDefinition: SchemaDefinition = {
            ...options!.useUUID && { _id: COMMON_SCHEMAS.PRIMARY_ID },
            createdAt: SchemaTypes.Date,
            updatedAt: SchemaTypes.Date
        };

        super(
            merge(definition || {}, defaultDefinition),
            merge(options || {}, defaultSchemaOptions)
        );

        this.set('toJSON', { virtuals: true });
        this.set('toObject', { virtuals: true });
    }

    private getHiddenFields() {
        const hidden: any = {};
        const fields = this.get('hidden');
        if (fields) {
            fields.forEach((field: string) => hidden[field] = true);
        }
        return hidden;
    }
}