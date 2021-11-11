const router = require('express').Router();
const passport = require('passport');
const jwt = require("jsonwebtoken")
const User = require('./user-model')
passport.use((User.createStrategy()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post('/register', async (req, res) => {
    const { name, username, password, confirmPassword, email } = req.body
    if (!username || !password || !name || !email) {
        return res.status(404).json({ message: "Name, email, username and/or password fields empty" })
    }
    else {
        let founduser;
        try { founduser = await User.findOne({ username: username }) }
        catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
        if (!founduser) {
            if (password == confirmPassword) {
                User.register({ username: username, name: name, email: { address: email } }, password, (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(404).json({ message: "An error occured, try again" })
                    }
                    else {
                        passport.authenticate('local')(req, res, () => {
                            res.status(200).json({ message: "Success", user: user })
                        });
                    }
                });
            }
            else { return res.status(404).json({ message: "Passwords do not match" }) }
        }
        else { return res.status(404).json({ message: "User already exists" }) }
    }
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(404).json({ message: "Username and/or password fields empty" })
    }
    else {
        let founduser;
        try { founduser = await User.findOne({ username: username }) }
        catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
        if (founduser) {
            const user = new User({ username: username, password: password });
            passport.authenticate('local')(req, res, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({ message: 'An error occured' });
                }
                else {
                    req.login(user, (error) => {
                        if (error) {
                            console.log(error);
                            return res.status(401).json({ message: 'failure' });
                        }
                        else { return res.status(200).json({ message: 'Success', user: founduser }); }
                    })
                }
            });
        }
        else { return res.status(404).json({ message: "User not found" }) }
    }
})


router.post('/user/:username/verify-email', async (req, res) => {
    const username = req.params.username
    const email = req.body.email
    let founduser;
    try { founduser = await User.findOne({ username: username }) }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
    if (founduser) {
        if (founduser.email.address == email) {
            // TODO send verification link and token to the user via that email
            // TODO apply the jwt stategy here for tokens
            return res.status(200).json({ message: "Verification link sent to your email", email: email })
        }
        else { return res.status(404).json({ message: "Enter your correct email" }) }
    }
    else { return res.status(404).json({ message: "User not found" }) }
})


router.get('/user/:username/verify-email/:token', async (req, res) => {
    const { username, token } = req.params
    let founduser;
    try { founduser = await User.findOne({ username: username }) }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
    if (founduser) {
        // update the foundUser.email.verified to true
        return res.status(200).json({ message: "Email verified" })
    }
    else { return res.status(404).json({ message: "User not found" }) }
})


router.delete('/user/:username', async (req, res) => {
    const username = req.params.username
    let founduser;
    try { founduser = await User.findOne({ username: username }) }
    catch (error) { return res.status(404).json({ message: "An error occured, try again" }) }

    if (founduser) {
        try {
            await User.deleteOne({ username: username })
            return res.status(200).json({ message: `Deleted user ${username}` })
        }
        catch (error) { res.status(404).json({ message: "An error occured in deleting the user" }) }
    }
    else { return res.status(404).json({ message: "User not found" }) }
})


router.get('/users', async (req, res) => {
    let foundUsers;
    try {
        foundUsers = await User.find({})
        return res.status(200).json({ users: foundUsers })
    }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the users, try again" }) }
})


router.get('/user/:username', async (req, res) => {
    const username = req.params.username
    let foundUser;
    try {
        foundUser = await User.find({ username: username })
        return res.status(200).json({ users: foundUser })
    }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
})


router.post('/user/:username/forgot-password', async (req, res) => {
    const username = req.params.username
    let foundUser;
    try { foundUser = await User.findOne({ username: username }) }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
    if (foundUser) {
        const secret = process.env.JWT_SECRET + foundUser.id
        const payload = { username: foundUser.username, id: foundUser.id }
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3000/user/${foundUser.username}/reset-password/${token}`
        console.log(link);
        // TODO send email to the user with the link
        return res.status(200).json({ message: "Password reset link sent to your email" })
    }
    else { return res.status(404).json({ message: "User not found" }) }
})


router.post('/user/:username/reset-password/:token', async (req, res) => {
    const username = req.params.username
    let foundUser;
    try { foundUser = await User.findOne({ username: username }) }
    catch (error) { return res.status(404).json({ message: "An error occured in finding the user, try again" }) }
    if (foundUser) {
        const token = req.params.token
        const secret = process.env.JWT_SECRET + foundUser.id
        try { const payload = await jwt.verify(token, secret) }
        catch (error) { return res.status(404).json({ message: "Link expired" }) }
        foundUser.setPassword(req.body.password, () => {
            foundUser.save()
            return res.status(200).json({ message: "Password reset successfully" });
        })
    }
    else { return res.status(404).json({ message: "User not found" }) }
})

router.get("/logout", (req, res) => {
    req.logout();
    return res.send(200).json({ message: "success" })
});


module.exports = router;