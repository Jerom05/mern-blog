import {useState, useEffect} from 'react'
import axios from 'axios'
import {myPosts} from '../services/request'
import {Route, Link } from 'react-router-dom';
import PostItem from './PostItem'
import './userProfile.css'

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")

const UserProfile = ()=>{
    const [state, setState] = useState({name:'Jerom Ghagra'})
    const [posts, setPosts] = useState([])
    const [render, setRender] =useState(true)

    useEffect(()=>{
        const getUser = async() =>{
            try{
                const user = await axios.get('http://localhost:5000/api/user/me')
                const res = await myPosts() 
                setState(user.data)
                setPosts(res.data)
            }catch(ex){
                console.log(ex)
                return 
            }
        }
        getUser()
    },[render])

    const makeRender = ()=>{
        if(render)  setRender(false)
        else setRender(true)
        
    }

    const post =()=>{
        return (
            <div>
                {posts.map(post=>{
                    <PostItem post={post} user={state} makeRender={makeRender}/>
                })}
            </div>
        )
    }

    return(
        <div>
            <div className="cover-box">
                <div className='name-header'>
                    {state.name}
                </div>
                <div className='navigation'>
                    <div>
                        <Link to ="/profile/myposts">Posts</Link>
                    </div>
                    <div>
                        Profile
                    </div>
                </div>
            </div>
            <hr />


            <div className="body">
                <Route path='/profile/myposts' component = {post}/>
            </div>

        </div>
    )
}

export default UserProfile