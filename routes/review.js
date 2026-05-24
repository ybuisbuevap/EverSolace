const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const { listingSchema , reviewSchema } = require('../schema.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/review');


//reviews
//post route
router.post('/', 
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

//delete route to delete a review
router.delete('/:reviewId',
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;