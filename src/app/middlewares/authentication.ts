import { Response, NextFunction, AuthedRequest } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';

const invalidTokenError = {
    type: 'InvalidAccessTokenError',
    message: 'Invalid access token supplied.'
};

export default function authentication() {
    return (req: AuthedRequest, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res.status(401);
            res.json({
                type: 'MissingAuthorizationError',
                message: 'Missing authorizaton header. Unable to authenticate request'
            });
            return;
        }

        const tokenParts = authorization.split('Bearer ');

        if (tokenParts.length < 2) {
            res.status(401);
            res.json(invalidTokenError);
            return;
        }

        const token = tokenParts[1];
        const decodedToken = <any>verify(token, config.SECRET_KEY);
        const { email } = decodedToken;
        req.user = {
            email
        };
        next();
    };
}