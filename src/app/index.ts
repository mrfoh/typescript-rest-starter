import container from './di';
import IDENTIFIERS from './identifiers';
import config from './config';
import { createServer } from 'http';
import createApp from './app';
import { Logger } from 'pino';
import Mongoose from 'mongoose';
import { connectMongo } from './data/connections/connectMongo';


const app = createApp();
const server = createServer(app);
const logger = container.get<Logger>(IDENTIFIERS.LOGGER);

Mongoose
    .connection
    .on('connecting', () => logger.info(`Connecting to DB`))
    .on('connected', () => {
        logger.info('Connected to MongoDB, starting API server..');
        server.listen(config.PORT, () => logger.info(`Server listening on ${config.PORT}...`));
    })
    .on('disconnected', () => {
        logger.warn(`Database is disconnecting, server will be closed`);
        server.close();
    })
    .on('error', (error: Error) => {
        logger.error(`Database error ${error.message}`);
    });

server
    .on('error', (error: Error) => {
        logger.error(error.message, error);
    });

    process
    .on('SIGINT', () => {
        Mongoose.connection.close();
        logger.info(`API Server crashed at ${Date.now()}, DB connection closed`);
    });

process
    .on('uncaughtException', error => {
        logger.error('There was an uncaught error', error);
    });

process
    .on('unhandledRejection', error => {
        logger.error('There was an unhandled promise rejection', error);
    });

connectMongo(config.MONGO_URL);