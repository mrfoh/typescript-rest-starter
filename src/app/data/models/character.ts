import { MongoModel, IMongoModel } from './mongoModel';
import { COMMON_SCHEMAS } from './commonMongoSchemas';

export interface ICharacter extends IMongoModel {
    name: string;
    realName: string;
    aliases?: string[];
    gender?: string;
    bio?: string;
    abilities?: string[];
    dateOfBirth?: Date;
    dateOfDeath?: Date;
}

export const CharacterSchema = new MongoModel({
    name: COMMON_SCHEMAS.INDEXABLE_REQUIRED_STRING,
    realName: COMMON_SCHEMAS.INDEXABLE_REQUIRED_STRING,
    aliases: [String],
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary', 'Others']
    },
    bio: COMMON_SCHEMAS.INDEXABLE_STRING,
    abilities: [String],
    dateOfBirth: Date,
    dateOfDeath: Date
}, {
    useUUID: true,
    softDeletes: true
});