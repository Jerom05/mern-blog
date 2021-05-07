import {useState,useEffect} from 'react'
import {getPosts,createPost, createComment} from '../services/request'
import jwtDecode from 'jwt-decode'
import PostItem from './PostItem'
import './Home.css'

const Home = ()=>{
    const [posts, setPost] = useState([{title:"English Grammer", comments:[{name:"Jerom", text:'Thankyou'}]}])
    const [user, setUser] = useState(null)
    const [render,setRender] = useState('')
    const [state, setState] = useState({
        title:'',
        description:'',
        render:true
    })

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
    },[render])

    const handlChange = (e)=>{
        const property = e.target.name
        state[property] = e.target.value
        setState({...state})
    }

    const handleSubmit =async (event)=>{
        event.preventDefault()
        await createPost(state.title,state.description)
        setState({...state, title:'', description:''})
    }

    const makeRender = ()=>{
        if(render)  setRender(false)
        else setRender(true)
        
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
                <div className = "create-post-form">
                </div>
                {posts.length !==0 ?renderPost():'No posts yet'}
            </div>
        </div>
    )
    
}

export default Home




{/* user post*/}
            
// {
//     user.length ===0? '':<div>
//         {/* onSubmit={event=>handleSubmit(event)} */}
//         <form onSubmit={event=>handleSubmit(event)} >
//     <div className='input-field'>
//         <input 
//             name='title'
//             type='text'
//             value={state.title}
//             placeholder='title'
//            onChange = {e=>handlChange(e)}
//             />
//     </div>
    
//     <div className='input-block'>
//         <input 
//             name='description'
//             type='text'
//             value={state.description}
//             placeholder='description'
//             onChange = {e=>handlChange(e)}
//             />
//     </div>
    
//     <button >Submit</button>
// </form>

//     </div>
// }
