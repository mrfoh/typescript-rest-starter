import 'reflect-metadata';
import { Container } from 'inversify';
import IDENTIFIERS from './identifiers';
import { Logger } from 'pino';
import logger from './logger';
// Add Controlllers
import './controllers';
/**
 * DI Container
 */
const container = new Container();


container
    .bind<Logger>(IDENTIFIERS.LOGGER)
    .toConstantValue(logger);

export default container;