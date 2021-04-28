import {useState, useEffect} from 'react'
import axios from 'axios'
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")

const UserList = ()=>{
    const [state, setState] = useState([])
    useEffect(()=>{
        const getUser = async() =>{
            try{
                const res = await axios.get('http://localhost:5000/api/user')
                setState(res.data)
            }catch(ex){
                console.log(ex)
                return 
            }
        }
        getUser()
    },[])
    const renderList = ()=>{
        return(
            <div>
                {
                    state.map(user=>(
                        <div key={user._id}>
                            {user.name}
                        </div>
                    ))
                }
            </div>
        )
    }
    console.log(state)
    return(
        <div>
           {renderList()}
           user
        </div>
    )
}

export default UserList