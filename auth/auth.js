const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/User');

// handle user registration
passport.use('signup', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (request, email, password, done) => {
    try {
        const { username } = request.body;
        const user = await User.create({email, password, username});
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// handle user login
/// In general, do not let user know a username or a password could not be found.
/// Simply let them know with a generic message that the credentials are invalid. 
passport.use('login', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email});
        if (!user){
            return done(new Error('user not found'), false);
        }
        const valid = await user.isValidPassword(password);
        if (!valid){
            return done(new Error('invalid password'), false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));