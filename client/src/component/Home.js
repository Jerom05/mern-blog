import {useState,useEffect} from 'react'
import {getPosts,createPost, createComment} from '../services/request'
import jwtDecode from 'jwt-decode'
import PostItem from './common/PostItem/PostItem'
import PostBox from './common/postBox'
import './Home.css'

const Home = ()=>{
    const [posts, setPost] = useState([{title:"English Grammer", comments:[{name:"Jerom", text:'Thankyou'}]}])
    const [user, setUser] = useState(null)
    const [render,setRender] = useState('')

    useEffect(()=>{
        try{
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            
            if(user){
                setUser(user)
              }
        }
        catch(ex){
            console.log(ex)
        }

        const getPost = async()=>{
            try{
                const res = await getPosts()
                setPost(res.data)
                console.log('set post', res.data)
            }catch(err){
                console.log(err)
            }
        }
        getPost()
        console.log('home post',posts)
        console.log('user', user)
    },[render])

    const makeRender = ()=>{
        if(render)  setRender(!render)
        else setRender(!render) 
    }

    const renderPost = ()=>{
        return(
            <div>
                {posts.map(post=>{
                    return(
                       <PostItem post={post} user={user} makeRender={makeRender}/>
                    )})}
            </div>
        )
    }

    return(
        <div className = "homepage">
            <div className='homepage-container'>
                {user &&(
                    <div className = "create-post-form">
                        <PostBox makeRender ={makeRender}/>
                    </div>
                )}
                {posts.length !==0 ?renderPost():'No posts yet'}
            </div>
        </div>
    )
    
}

export default Home