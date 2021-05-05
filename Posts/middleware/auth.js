const config = require('config')
const jwt = require('jsonwebtoken')
const auth = (req, res, next)=> {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try{
        const decoded = jwt.verify(token, config.get('key'))
        req.user = decoded
        console.log(req.user)
        next()
    }
    catch(ex){
        res.status(400).send('Invalid token')
    }
}

module.exports = auth