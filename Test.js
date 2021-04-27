import { func } from "joi";


console.log("Hey there...")

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password){
    if(password.length<6){
        return 'password must be greater than charachers'
    }
}

state = {
    email:'',
    error:{
        email:'',
        password:''
    }
}

onchange=(e)=>{
   res = e.target.value
   switch(e){
        case e.target.name ==='email':
            vld =validateEmail(res)
            if(!vld){
                setState({...state, error:{['password']:'please enter a valid password'}})
            } 
        case e.target.name === 'password':
            vld = validatePassword(state.password)
            if(!vld){
                setState({...state, error:{['password']:'password length must be greater than 5.'}})
            } 
   }
   
}