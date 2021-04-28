import {useState, useEffect} from 'react'
import axios from 'axios'
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")
const UserProfile = ()=>{
    const [state, setState] = useState({})
    useEffect(()=>{
        const getUser = async() =>{
            try{
                const res = await axios.get('http://localhost:5000/api/user/me')
                setState(res.data)
            }catch(ex){
                console.log(ex)
                return 
            }
        }
        getUser()
    },[])

    console.log(state)
    return(
        <div>
            name
            {state.name}
            {state._id}
        </div>
    )
}

export default UserProfile