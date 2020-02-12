import { injectable } from 'inversify';
import { MongoRepository } from './mongoRepository';
import { IAccount, AccountSchema } from '../models/account';

@injectable()
export class AccountMongoRepository extends MongoRepository<IAccount> {
    constructor() {
        super('Account', AccountSchema);
    }
}