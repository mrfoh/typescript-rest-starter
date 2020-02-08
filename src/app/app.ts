import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import cors from 'cors';
import responseTime from 'response-time';


import container from './di';
import config from './config';

export default function createApp() {
    const server = new InversifyExpressServer(container, null, {
        rootPath: config.API_PREFIX
    });

    server.setConfig(app => {
        app.use(cors({ origin: '*' }));
        app.use(responseTime({ suffix: true }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    });

    return server.build();
}
