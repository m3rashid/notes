const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // steps
    // 1. Get auth header value and check if not undefined
    // 2. Get the bearer token value formatted correctly
    // 3. Set the token in the request object

    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else{ res.status(403).json({ message: 'Undefined' }) }
}

// this is ideally done in the routes (login/signup) section
const signToken = (req, res, next) => {
    // do the authentication part which outputs a user or return error to the client
    let user;

    jwt.sign({user}, 'secretkey', {expiresIn: '48h'}, (err, token) => {
        res.json({token})
    })
    // secretkey is usually a long string
}


module.exports.verifyToken = verifyToken
module.exports.signToken = signToken
