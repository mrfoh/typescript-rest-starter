import { SchemaTypes } from 'mongoose';
import uuid from 'uuid';

export namespace COMMON_SCHEMAS {
    export const PRIMARY_ID = {
        type: SchemaTypes.String,
        default: uuid.v4
    };

    export const REQUIRED_STRING = {
        type: SchemaTypes.String,
        required: true
    };

    export const INDEXABLE_REQUIRED_STRING = {
        type: SchemaTypes.String,
        required: true,
        index: true
    };

    export const INDEXABLE_STRING = {
        type: SchemaTypes.String,
        index: true
    };

    export const DEFAULT_TRUTHY = {
        type: SchemaTypes.Boolean,
        default: true
    };

    export const DEFAULT_FALSEY = {
        type: SchemaTypes.Boolean,
        default: false
    };

    export const REQUIRED_DATE = {
        type: SchemaTypes.Date,
        required: true
    };
}