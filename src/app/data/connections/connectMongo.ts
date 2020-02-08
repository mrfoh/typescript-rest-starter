import mongoose, { Mongoose } from 'mongoose';

/**
 * Create a mongo connection
 *
 * MongoDB URI
 * @param {string} url
 * Mongo connection options
 * @param {mongoose.ConnectionOptions} options
 * @returns {Promise<Mongoose>}
 */
export async function connectMongo(url: string, options?: mongoose.ConnectionOptions): Promise<Mongoose> {
    const defaults: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };
    return await mongoose.connect(url, { ...defaults, ...options });
}