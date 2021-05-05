const express = require('express')
const {User,Validation} = require('../model/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', async(req,res)=>{
    const user = await User.find()
    res.send(user)
})

router.post('/', async (req, res)=>{
    
    const {error} = Validation(req.body)
    if(error) return res.status(400).send(error.details[0].message) 
    
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('Email already registered.')

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    user = new User({
        name:req.body.name,
        email:req.body.email,
        password: password
    })
    await user.save()

    const payload = {
        _id:user._id,
        name: user.name
    }
    const token = jwt.sign(payload, config.get('key'))
    res.status(200).send(token)
})

module.exports = router