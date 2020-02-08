import container from './di';
import IDENTIFIERS from './identifiers';
import config from './config';
import { createServer } from 'http';
import createApp from './app';
import { Logger } from 'pino';

const app = createApp();
const server = createServer(app);
const logger = container.get<Logger>(IDENTIFIERS.LOGGER);

server.listen(config.PORT, () => logger.info(`Server listening on ${config.PORT}...`));