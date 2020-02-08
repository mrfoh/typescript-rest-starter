export interface QueryOptions {
    conditions: any;
    select?: any;
    populate?: [{
        path: string;
        select?: string;
    }];
    sort?: any;
    per_page?: number;
    page?: number;
}


export interface PaginatedResult<T> {
    pagination: {
        total: number;
        per_page: number;
        page: number;
        pages: number;
    };
    data: T[];
}

export interface IMongoRepositoryInterface<T> {
    all(options: QueryOptions): Promise<T[]> | Promise<PaginatedResult<T>>;
    create(attributes: any): Promise<T>;
    getOneById(id: string): Promise<T>;
    getOneByField(field: string, value: any): Promise<T>;
    update(id: string, attrs: any): Promise<T>;
}