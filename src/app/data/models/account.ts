import { MongoModel, IMongoModel } from './mongoModel';
import { COMMON_SCHEMAS } from './commonMongoSchemas';
import bcrypt from 'bcryptjs';

export interface IAccount extends IMongoModel {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

export const AccountSchema = new MongoModel({
    firstName: COMMON_SCHEMAS.INDEXABLE_STRING,
    lastName: COMMON_SCHEMAS.INDEXABLE_REQUIRED_STRING,
    phoneNumber: COMMON_SCHEMAS.INDEXABLE_STRING,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}, {
    useUUID: true,
    softDeletes: true,
    hidden: ['password']
});

AccountSchema.methods.comparePassword = function(password: string) {
    return new Promise((resolve, _reject) => {
        const result = bcrypt.compareSync(password, this.password);
        resolve(result);
    });
};

AccountSchema.pre('save', function(this: any, next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});