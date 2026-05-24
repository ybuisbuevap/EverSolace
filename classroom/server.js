const express = require('express');
const app = express();
const users = require('./routes/user.js');
const posts = require('./routes/post.js');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
    secret: 'mysupersecretstring',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    next();
});

app.get('/register', (req, res) => {
    
    if(name==='anonymous') {
        req.flash('error', 'Name cannot be empty');
    } else{
        req.flash('success', 'Registration successful!');
    }

    req.flash('success', 'Welcome to the site!');
    req.flash('error', 'user not recognized');
    res.redirect('/hello');
    // res.send(`Welcome, ${req.session.name}!`);
});

app.get('/hello', (req, res) => {
    res.render('page.ejs', { name: req.session.name });
});

// app.get('/reqcount', (req, res) => {
//     req.session.count = (req.session.count || 0) + 1;
//     res.send(`sent a request ${req.session.count} times`);
// });

app.get('/test', (req, res) => {
    res.send('test successful');
});

// const cookieParser = require('cookie-parser');

// app.use(cookieParser('secretcode'));

// app.get('/setcookies', (req, res) => {
//     res.cookie('isLoggedIn', true);
//     res.cookie('isPrimeMember', true, { maxAge: 1000 * 60 * 60 * 24 });
//     res.send('Cookies have been set');
// });

// app.get('/getcookies', (req, res) => {
//     const cookies = req.cookies;
//     res.json(cookies);
// });

// app.get('/getsignedcookies', (req, res) => {
//     res.cookie('made-in' , 'India', { signed: true });
//     res.send('Signed cookie has been set');
// });

// app.get('/verifysignedcookies', (req, res) => {
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send('Check the console for cookies');
// });

// app.get('/getcookies', (req, res) => {
//     res.cookie('greet', 'Hello, World!');
//     res.send('Cookies have been set');
// });

// app.get('/greet', (req, res) => {
//     let {name = 'Guest'} = req.cookies;
//     res.send(`Hello, ${name}!`);
// });

// app.get('/', (req, res) => {
//     console.dir(req.cookies);
//     res.send('i am root');
// });

// app.use('/users', users);
// app.use('/posts', posts);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});