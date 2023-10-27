import passport from 'passport';
import local from 'passport-local';
import userModel from '../models/user.models.js'
import { createHash, isValidPassword } from '../utils/utils.js';
import GitHubStrategy from 'passport-github2';

//estrategia 1

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('/register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userModel.findOne({ email: username });
                if (user) {
                    console.log('Usuario ya existe');
                    return done(null, false);
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };

                let result = await userModel.create(newUser);

                return done(null, result);
            } catch (error) {
                return done('Error al optener el usuario' + error);
            };
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

    passport.use('login',
        new localStrategy({ usernameField: 'email' },
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    if (!user) {
                        console.log('El usuario es no existe');
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) return done(null, false)

                    return done(null, user);
                } catch (error) {

                }
            }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.8b318be509c77cf5',
        clientSecret: 'fe8c3513a38ecab209b94d53513a6011f894bc76',
        callbackURLL: 'http://localhost:3001/api/sessions/githubcallback'
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = userModel.findOne({email: profile._json.email});
            if(!user){
                let newUser = {
                    first_name: profile.__json.name,
                    last_name: '',
                    age: 20,
                    email: profile.__json.email,
                    password: ''
                }

                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }
    ));
};

export default initializePassport;