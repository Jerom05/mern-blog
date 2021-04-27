import React,{useEffect, useState} from 'react'
import { NavLink,Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './navBar.css'

const NavBar = ()=>{
    const [state, setState] = useState({})
    useEffect(()=>{
        
        try{
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            
            if(user){
                setState({user})
              }
        }
        catch(ex){
            return 
        }
    },[])

    const logout = ()=>{
        localStorage.removeItem('token')
        window.location='/'
    }
    const {user} = state
    console.log('nav', state)
    return(
        <div className = 'header-section'>
            
            {!user && (
                        <div className ='content'>
                            <NavLink className="item" to="/Login">Login</NavLink>
                            <NavLink className="item" to="/register">Register</NavLink>
                         </div>
                    )
                }


            {user && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                            <NavLink className=" nav-item nav-link" to='/logout'>Logout</NavLink>        
                        </React.Fragment>
                    )
                }

            
        </div>
    )
}

export default NavBar