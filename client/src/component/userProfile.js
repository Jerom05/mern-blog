import {useState, useEffect} from 'react'
import axios from 'axios'
import {myPosts} from '../services/request'
import {Route, Link } from 'react-router-dom';
import PostItem from './common/PostItem/PostItem'
import PostBox from './common/postBox'
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
    console.log('user profile', posts)
  
    const makeRender = ()=>{
        if(render)  setRender(false)
        else setRender(true)
        
    }

    const post =()=>{
        return (
            <div>
                <PostBox makeRender ={makeRender}/>
                {posts.map(post=>{
                    return(
                        <div>
                            <PostItem post={post} user={state} makeRender={makeRender}/>
                        </div>
                        
                    )
                    
                })}
                post
            </div>
        )
    }

    return(
        <div className="">
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