const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/users');
//const session = require('express-session');
const router = require('express').Router();
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const env = require('../env');


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    User.findOne({ attributes: ['id'], where: { id: user.id }, raw: true }).then((user) => {
        done(null, user.id);
    });
});

passport.use(
    'login',
    new LocalStrategy({ usernameField: 'login', passwordField: 'password' },
        async function(login, password, done) {
            try {
                const user = await User.findOne({ where: { login: login } });

                if (!user) {
                    return done({ message: 'Incorrect login' }, false, );
                }
                if (!(await user.isValidPassword(password))) {
                    return done({ message: 'Incorrect password' }, false);
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);


passport.use(
    new JwtStrategy({
            secretOrKey: env.secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(err);
            }
        })
);




router.use(bodyParser.json());
//router.use(session({ secret: 'MEGA_SECRET_KEY' }));
router.use(passport.initialize());
//router.use(passport.session());

module.exports = router;