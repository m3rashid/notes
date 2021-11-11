const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    intro: { type: String },
    banner: { type: String, default: "" }, // Give a default banner
    scope: { type: String, default: "a" },  // two levels of scope, within members or for all
    sections: [{
        subheading: { type: String },
        text: { type: String },
        image: { type: String }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 10 },
        comment: { type: String }
    }]
})

module.exports = new mongoose.model("Blog", blogSchema);