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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="item" to="/">HomeWork</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                    
              {
                  !user && (
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="item" to="/Login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                             <NavLink className="item" to="/register">Register</NavLink>
                        </li>
                     </ul>
                  )
              }

                {
                  user && (
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className=" nav-item nav-link" to='/users'>users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className=" nav-item nav-link" to='/logout'>Logout</NavLink>
                        </li>
                     </ul>
                  )
              }
              
            </div>
        </nav>
    )
    
}

export default NavBar