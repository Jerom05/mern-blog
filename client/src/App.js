import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './component/NavBar/navBar'
import Home from './component/Home'
import Login from './component/Login/Login'
import Logout from './component/Logout'
import Register from './component/Register/Register'
import UserList from './component/UserList/UserList'
import UserProfile from './component/userProfile'


const App = ()=>{
  return(
    <div>
      <NavBar />
      <hr />
      <Switch>
        <Route path='/Home' component = {Home}/>
        <Route path='/Login' component = {Login}/>
        <Route path='/Logout' component={Logout} />
        <Route path='/Register' component = {Register}/>
        <Route path='/users' component= { UserList} />
        <Route path='/profile' component={UserProfile} />
      </Switch>
    </div>
  )
}

export default App