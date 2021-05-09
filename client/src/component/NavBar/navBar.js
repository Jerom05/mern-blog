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
        <nav className="navbar-section">
            <div className="logo">
                <NavLink className="item" to="/">ShareZone</NavLink>
            </div>

            <div className="navbar-items" >     
                {!user && (
                    <ul className="navbar-item">
                        <li className="nav-item active">
                            <NavLink className="item" to="/Login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                             <NavLink className="item" to="/register">Register</NavLink>
                        </li>
                     </ul>
                )}
                {user && (
                    <ul className="navbar-item">
                        <li className="nav-item active">
                        <NavLink className=" item" to='/logout'>Logout</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className=" item" to='/users'>users</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="item" to="/profile">{user.name}</NavLink>
                           
                        </li>
                    </ul>
                 )}
            </div>
        </nav>
    )
    
}

export default NavBar