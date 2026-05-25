if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/expressError');
const { listingSchema , reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// Connect to MongoDB
mongoose.set('strictQuery', true);

const dbURL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbURL);
}

main()
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    })
    .catch(err => {
        console.log("DB Connection Error:", err);
    });




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

// const store = MongoStore.create({
//     mongoUrl: dbURL,
//     touchAfter: 24 * 60 * 60
// });

// store.on("error", function (e) {
//     console.log("Session Store Error", e);
// });

const sessionOptions = {
    // store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

app.get('/demouser', async (req, res) => {
    const fakeUser = new User({ 
        email: 'test@example.com' ,
        username: 'testuser'
    });
    let registeredUser = await User.register(fakeUser, 'password123');
    res.send(registeredUser);
});

// Root route
// app.get('/', (req, res) => {
//     res.send('i am root');
// });


app.use("/listings", listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);
app.get('/', (req, res) => {
    res.redirect('/listings');
});

//route to test creating a sample listing
// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 500,
//         location: "California",
//         country: "USA"
//     });
//     await sampleListing.save();
//     res.send(sampleListing);    
// });

// app.get('/listings/:id',
//     wrapAsync(async (req, res) => {
//         let { id } = req.params;
//         const listing = await Listing.findById(id).populate("reviews");
//         if (!listing) {
//             throw new ExpressError("Listing Not Found", 404);
//         }
//         res.render('listings/show.ejs', { listing });
// }));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

//global error handler

app.use((err, req, res, next) => {
    let{ statusCode=500, message='Something went wrong'} = err;
    return res.render('error.ejs', { err });
    // res.status(statusCode).send(message);
});

// app.listen(8080, () => {
//     console.log('Server is running on port 8080');
// });