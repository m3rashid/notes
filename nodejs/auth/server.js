require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    name: 'blogs',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connection to local DB
mongoose.connect(`mongodb://localhost:27017/databaseName`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongoose is connected'))
    .catch(err => console.log(err));


app.use('/', require('./index'))
app.listen(process.env.PORT || 3000, () => console.log('Server ready'))