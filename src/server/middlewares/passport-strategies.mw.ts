import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt';

import { Application } from 'express';
import { compareHash } from '../utils/passwords';
import { Payload } from 'aws-sdk/clients/iotdata';

import config from '../config';
import db from '../db';

export function configurePassport(app: Application) {
    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const [user] = await db.users.find('email', email);
            console.log(user);
            if (user && compareHash(password, user.password)) {
                delete user.password;
                done(null, user);      
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }));
    
    
    passport.use(new PassportJWT.Strategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret
    }, (payload: Payload, done) => {
        try {
            done(null, payload);
        } catch (error) {
            done(error);
        }
    }))

    app.use(passport.initialize());
}

