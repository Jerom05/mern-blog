import { NavLink,Link } from 'react-router-dom'
import './navBar.css'

const NavBar = ()=>{
    return(
        <div className = 'header-section'>
            <div className ='content'>
                <NavLink className="item" to="/Login">Login</NavLink>
                <NavLink className="item" to="/register">Register</NavLink>
            </div>
        </div>
    )
}

export default NavBar