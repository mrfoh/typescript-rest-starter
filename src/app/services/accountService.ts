import config from '../config';
import { injectable, inject } from 'inversify';
import IDENTIFIERS from '../identifiers';
import REPOS from '../data/repositories/repos';
import { EventEmitter } from 'events';
import { IAccount } from '../data/models/account';
import { AccountMongoRepository } from '../data/repositories';
import ACCOUNT_SERVICE_EVENTS from './accountServiceEvents';
import { Request } from 'express';
import { AccountNotFoundError, InvalidLoginCredentialsError } from './accountServiceErrors';
import { sign } from 'jsonwebtoken';

interface EmailPasswordTuple {
    email: string;
    password: string;
}

@injectable()
export default class AccountService  {
    @inject(REPOS.ACCOUNT_REPO)
    private accountRepository!: AccountMongoRepository;

    @inject(IDENTIFIERS.EMITTER)
    private emitter!: EventEmitter;

    /**
     * Generate JWT
     * @param {IAccount} account
     * @returns {string}
     */
    private makeJWT(account: IAccount): string {
        const { email, id } = account;
        const secret = config.SECRET_KEY;
        const expiresIn = config.JWT_TTL;

        return sign({ email }, secret, {
            audience: id,
            expiresIn,
           subject: 'myclient'
        });
    }
    /**
     * Authenticate user using email and password
     * @param {EmailPasswordTuple} param
     * @returns {Promise<any>}
     */
    async authenticateUserByEmailPassword(param: EmailPasswordTuple): Promise<any> {
        try {
            let token = '';
            const { email, password } = param;
            const account = await this.accountRepository.getOneByField('email', email);
            if (!account) {
                throw new AccountNotFoundError('No account found for email address.');
            }

            const valid = await account.comparePassword(password);

            if (!valid) {
                this.emitter.emit(ACCOUNT_SERVICE_EVENTS.FAILED_LOGIN_ATTEMPT, { account });
                throw new InvalidLoginCredentialsError('Authentication failed, invalid email or password.');
            }

            try {
                token = this.makeJWT(account);
                this.emitter.emit(ACCOUNT_SERVICE_EVENTS.SUCCESSFULL_LOGIN, { account, token });
            } catch (error) {
                throw error;
            }

            return {
                account,
                token
            };
        } catch (error) {
            throw error;
        }
    }

    async create(req: Request) {
        try {
            const attrs = req.body;
            const account = await this.accountRepository.create(attrs);
            const token = this.makeJWT(account);

            return {
                account,
                token
            };
        } catch (error) {
            throw error;
        }
    }
}