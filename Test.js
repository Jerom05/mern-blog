// querying javascript
const config = require('config')

const obj = {name:'Jerom'}

const {name} = obj

var myJSON = '{"name":"John", "age":31, "city":"New York"}';


var myObj = JSON.parse(myJSON);

console.log(config.get('key'))

//
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

const {check , validationResult} = require('express-validator/check')

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', ' please enter a email').isEmail()
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
     
    const {name, email, password} = req.body
    try {
       let user= await User.findOne({email})
       if(user){
          return res.status(400).json({errors: [{ msg: 'user exists'}]})
       }

       const avatar  = gravatar.url(email,{ s:'200',r:'pg',d:'mm'} )
        user = new User({
            name,email,password,avatar
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password , salt)
         await user.save()

         const payload = {
             user:{
                 id:user.id
             }
         }
     
         jwt.sign(payload, config.get('jwtSecret'),{
             expiresIn:360000
         }, (err, token)=>{
             if(err) throw err;
             res.json({ token })
         })
    } catch (error) {
        console.log(error)
    }
     
})


module.exports = router