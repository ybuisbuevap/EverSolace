const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;
const Review = require('./review');


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {

        url : String,
        filename : String
//         type: String,
//         default: "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: v => {
//             if (!v || v === "") return "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//             if (typeof v === 'object' && v.url) return v.url;
//             return v;
//   }
},


    // image: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        
    //     set: (v) => v === "" ? "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    // },
    price: {
        type: Number,
        
    },
    location: {
        type: String,
        
    },
    country : {
        type: String,
      
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

listingSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;