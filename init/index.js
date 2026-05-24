const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');

main()
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '69a93a1252e58c086de3f7bd',
    }));

    await Listing.insertMany(initData.data);
    console.log("Database Initialized with Sample Data");
};

initDB();