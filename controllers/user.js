const User = require('../models/user.js');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup');
};

module.exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to EverSolace!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = async(req, res) => {
        req.flash('success', 'Welcome back to EverSolace!');
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.flash('success', 'You have logged out successfully!');
        res.redirect('/listings');
    });
};