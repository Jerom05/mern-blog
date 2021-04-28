const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const {User, validation} = require('../model/user')
const auth = require('../middleware/auth')

router.get('/me',[auth],async(req, res)=>{    
    const user = await User.findById(req.user._id).select("-password")
    return res.status(200).send(user)
})

router.get('/',[auth],async(req, res)=>{    
    const user = await User.find().select("-password")
    return res.status(200).send(user)
})

router.post('/', async (req,res)=>{

    const {error} = validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name:req.body.name,
        email:req.body.email,
    })

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    user.password = password
    await user.save()

    const token = jwt.sign({name:user.name , _id:user._id },config.get('key'))

    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .json({token})
})

module.exports = router