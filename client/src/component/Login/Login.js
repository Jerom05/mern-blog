import {useState} from 'react'
import axios from 'axios'
import {validateEmail, validatePassword} from './validate'

const Login = (props)=>{
    const [state, setState] = useState({
            email:'', 
            password:'', 
            errors:{
                email:'',
                password: '',
                invalid:''
            },
            button:true
        })
    
    const handlChange = e=>{
        const property = e.target.name
        state[property] = e.target.value
        state.errors.invalid =''
        Validate(property) 
        console.log('state', state)
        setState({...state})
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log('submit')
        submit(state.email,state.password);
        setState({...state})
        console.log(state)
    }

    const submit =async (email , password)=>{
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth',{
                email,
                password
            })
            localStorage.setItem('token', data) 
            window.location = '/' 
        }
        catch(ex){
            if(ex.response && ex.response.status===400){
              state.errors.invalid = ex.response.data
              setState({...state})
            }
        }
    }

    const Validate = (property) =>{
        switch(property){
            case 'email':
                const valid = validateEmail(state[property])
                if(!valid){
                    state.errors[property] = 'Enter valid email'
                }
                if(valid){
                    state.errors[property] = null
                }
        }
        switch(property){
            case 'password':
                const valid = validatePassword(state[property])
                if(!valid){
                    state.errors[property] = 'password length must be greater than 5.'
                }
                if(valid){
                    state.errors[property] = null
                }
        }
        if (state.errors.email ===null && state.errors.password === null ){
            state.button = false
         }
        else{
            state.button =true
        }
    }
    
    return(
        <div className='login-section'>
            <div className='from-group'>
                <form onSubmit = {event=>handleSubmit(event)}>
                    <div className='input-field'>
                        <label>email</label>
                        <input 
                            name='email'
                            type='name'
                            value={state.email}
                            onChange = {e=>handlChange(e)}
                            />
                            {state.errors.email === null ? null: <div>{state.errors.email}</div>} 
                    </div>
                    <hr />
                    <div className='input-field'>
                        <label>password</label>
                        <input 
                            name='password'
                            type='password'
                            value={state.password}
                            onChange={e=>handlChange(e)}
                            />
                        {state.errors.password === null ? null: <div>{state.errors.password}</div>} 
                    </div>
                    <button disabled={ state.button ? true : false} >submit</button>
                </form>
                {state.errors.invalid ? <div>{state.errors.invalid}</div>: null}
            </div>
        </div>
    )
}

export default Login
