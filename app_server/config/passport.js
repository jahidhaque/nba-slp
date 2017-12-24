/*
|----------------------------------------------------------------
| Setting up passport for local authentication.
|----------------------------------------------------------------
*/
const Mongoose = require('mongoose');
const Passport = require('passport');
const LocalStrategy = require('passport-local');

const User = Mongoose.model('users');


/*
|----------------------------------------------------------------
| Setting up local strategy for passport.
|----------------------------------------------------------------
*/
Passport.use(new LocalStrategy({ usernameField: 'email' }, function (username, password, done) {
    // find user according to email address.
    User.findOne({ email: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        else if (!user) {
            return done(null, false, {
                error: 'Invalid username',
            });
        }

        else if (!user.validatePassword(password)) {
            return done(null, false, {
                error: 'Invalid password',
            });
        }
        else {
            return done(null, user);
        } 
     });
}));