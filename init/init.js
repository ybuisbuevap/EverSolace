require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");
const User = require("../models/user");

mongoose.set('strictQuery', true);

const dbURL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbURL);
}

main()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function initDB() {
  await Listing.deleteMany({});

  // 🔥 get any existing user
  const user = await User.findOne();

  if (!user) {
    console.log("❌ No user found. Create one first at /demouser");
    return;
  }

  // 🔥 attach owner to each listing
  const newData = initData.data.map(obj => ({
    ...obj,
    owner: user._id
  }));

  await Listing.insertMany(newData);

  console.log("🌱 Database seeded successfully");
}

initDB();