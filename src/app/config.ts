import fs from 'fs';
import path from 'path';
import os from 'os';
import dotenv from 'dotenv-extended';
import dotEnvExpand from 'dotenv-expand';
const dotEnvParseVariable = require('dotenv-parse-variables');

/**
 * Loads environment variables
 * @returns {any}
 */
function loadEnv(): any {
    const envPath = path.join(__dirname, '../../.env');
    if (!fs.existsSync(envPath)) {
        return process.env;
    }

    let env: any = dotenv.load({
        silent: true,
        errorOnMissing: true,
        errorOnExtra: true
    });

    env = dotEnvExpand(env);
    env = dotEnvParseVariable(env);

    return env;
}

// Load ENV Variables
const config = loadEnv();

export default config;
