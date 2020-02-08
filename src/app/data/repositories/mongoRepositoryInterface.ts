export interface QueryOptions {
    conditions: any;
    select?: any;
    populate?: [{
        path: string;
        select?: string;
    }];
    sortBy?: any;
    sortOrder?: 'ascending' | 'descending';
    perPage?: number;
    page?: number;
}


export interface PaginatedResult<T> {
    pagination: {
        total: number;
        perPage: number;
        page: number;
        pages: number;
    };
    data: T[];
}

export interface PaginationOptions {
    perPage: number;
    total: number;
    page: number;
}

export interface IMongoRepositoryInterface<T> {
    all(options: QueryOptions): Promise<T[] | PaginatedResult<T>>;
    create(attributes: any): Promise<T>;
    getOneById(id: string): Promise<T>;
    getOneByField(field: string, value: any): Promise<T | null>;
    update(id: string, attrs: any): Promise<T>;
    archive(id: string): Promise<T>;
    delete(id: string): Promise<T>;
}