const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('config')
const {User} = require('../model/user')
const { invalid } = require('joi')

router.post('/', async(req,res)=>{
    const {error} = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid Email or Password')

    const validPassword = await bcrypt.compare( req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid Password')
    
    const token = jwt.sign({name:user.name, _id:user._id}, config.get('key'))
    
    res
        .status(200)
        .send(token)
        
})

const validation = (value)=>{
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(value)
}

module.exports = router