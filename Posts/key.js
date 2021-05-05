
// Jeromio
let id = ''
let Jerom = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhlYjg2MjEzNDZlMTMyMDBlMTgwYTUiLCJuYW1lIjoiSmVyb21pbyBDYWx2aW4iLCJpYXQiOjE2MTk5NjYwNTB9._Onlmw2MuZafZB9I1k6fIvHSYqTOH0scVarRx04IpFc'

let Sarah = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhlYjFlYzg1ZTExZjNiOGM0MjhiYzEiLCJuYW1lIjoiSmVzc2ljYSBTYXJhaCIsImlhdCI6MTYxOTk2NDM5Nn0.EoAWYbNboHct_Ru83LkpkQ5Pv2nes5cuerUOHN7u1I0'

//Create User shcema

const user ={
    "name" : "Name",
    "email" : "Email",
    "password" : "Password"
}

// Post Schema 

const Post = {
    "authorid": "author._id", 
    "author": 'author.name',
    "titel" : 'Some string',
    "description" : 'Some string',
    "date" : "default date" ,
}

//Comment Schema 

const comment = {
    "userid":'user._id',
    "name": 'user.name',
    "description": String,
    date:{
        type:Date,
        default: Date.now, 
    }
}