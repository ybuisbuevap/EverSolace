const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}).populate("owner");
    res.render('listings/index.ejs', { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};

module.exports.showListing = (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate: { 
                path: "author" 
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
});

module.exports.createListing = (async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'New listing created successfully!');
    res.redirect('/listings');
});

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace('/upload', '/upload/w_250'); // add transformation to make the image smaller in the edit form
    listing.image.url = originalImage;

    res.render('listings/edit.ejs', { listing , originalImage});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    // if (!listing.owner.equals(res.locals.currUser._id)) {
    //     req.flash('error', 'You are not the owner of this listing!');
    //     return res.redirect(`/listings/${id}`);
    // }

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
    }
    await updatedListing.save();
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/listings');
};

