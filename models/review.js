const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    // product: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
