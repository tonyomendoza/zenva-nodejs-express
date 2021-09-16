const passport = require('passport');
const localStrategy = require('passport-local');

// handle user registration
passport.use('signup', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (request, email, password, done) => {
    console.log(email.password);
    console.log(request.body);

    const { username } = request.body;
    if (username && username != 'error'){
        return done(null, { name: 'tony' })
    }
    else{
        return done(new Error('invalid user'));
    }
}));

// handle user login
/// In general, do not let user know a username or a password could not be found.
/// Simply let them know with a generic message that the credentials are invalid. 
passport.use('login', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    if (email != 'tony@mindovermattergames.com'){
        return done(new Error('user not found'), false);
    }
    
    if(password != 'test'){
        return done(new Error('invalid password'), false);
    }

    return done(null, {name: 'tony'});
}));