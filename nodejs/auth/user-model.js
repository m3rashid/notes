const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true, unique: true, required: true },
    password: String,
    name: { type: String, required: true },
    email: {
        address: { type: String, required: true },
        verified: { type: Boolean, default: false }
    },
    avatar: { type: String, default: "" },  // set default avatar (customized)
    permissions: { type: String, default: "" },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    written: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.plugin(require('passport-local-mongoose'));
module.exports = new mongoose.model("User", userSchema);