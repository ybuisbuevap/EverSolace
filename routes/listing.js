const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const { listingSchema , reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedIn , isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage: storage });

router.route('/')
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single('image'),
        validateListing,
        wrapAsync(listingController.createListing));

router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
    .put(
        upload.single('image'),
        validateListing,
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.updateListing)
    )
    .delete( 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
)
    .get(wrapAsync(listingController.showListing));

//edit route to show the form to edit an existing listing
router.get('/:id/edit', 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;
