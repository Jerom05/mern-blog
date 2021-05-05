const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {User} = require('../model/User')

router.post('/', async(req,res)=>{
    const {error} = validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid Email')

    const validPassword = bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({_id:user._id, name:user.name}, config.get('key'))
    res.send(token)
})

const validation = (obj)=>{
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(80).required()
    })
    return Schema.validate(obj)
}

module.exports = router
