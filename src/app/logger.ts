import config from './config';
import pino from 'pino';

const REDACTED_FIELDS = [
    'headers.authorization',
    "headers['x-access-token']",
    'headers.key',
    'query.access_token',
    '*.password',
    '*.currentPassword',
    '*.newPassword'
];

function createLogger(): pino.Logger {
    const isNonDev = !['production', 'sandbox', 'staging', 'qa', 'testing', 'test']
        .includes(config.ENV.toLowerCase());

    return pino({
        level: isNonDev ? 'debug' : 'info',
        customLevels: {
            notice: 35
        },
        name: 'REST-API',
        useLevelLabels: true,
        redact: {
            paths: REDACTED_FIELDS,
            censor: 'REDACTED'
        },
        timestamp: () => `,"time":"${new Date().toISOString()}"`
    });
}

export default createLogger();
