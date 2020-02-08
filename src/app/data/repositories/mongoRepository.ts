import { injectable } from 'inversify';
import { Document } from 'mongoose';
import { IMongoRepositoryInterface, PaginatedResult, QueryOptions } from './mongoRepositoryInterface';

@injectable()
export abstract class MongoRepository<T extends Document> implements IMongoRepositoryInterface<T> {
    all(options: QueryOptions): Promise<T[]> | Promise<PaginatedResult<T>> {
        throw new Error('Method not implemented.');
    }

    create(attributes: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

    getOneById(id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }

    getOneByField(field: string, value: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

    update(id: string, attrs: any): Promise<T> {
        throw new Error('Method not implemented.');
    }
}