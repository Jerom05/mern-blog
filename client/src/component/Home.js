import {useState,useEffect} from 'react'
//import { post } from '../..routes/user'
import {getPosts,createPost} from '../services/request'
import jwtDecode from 'jwt-decode'
const Home = ()=>{
    const [posts, setPost] = useState([])
    const [user, setUser] = useState([])
    const [state, setState] = useState({
        title:'',
        description:'',
        password:'',
        errors:{
            email:'',
            password: '',
            invalid:''
        },
        button:true
    })

    useEffect(()=>{

        try{
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            
            if(user){
                setUser([user])
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
    },[state])

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
    const renderPost = ()=>{
        return(
            <div>
                {posts.map(post=>{
                    return(
                        <div key={post._id}>
                            {post.title}
                            {post.description}
                            {post.author}
                        </div>
                    )
                })}
            </div>
        )
    }
    return(
        <div>
            Home
            {/* user post*/}
            {
                user.length ===0? '':<div>
                    {/* onSubmit={event=>handleSubmit(event)} */}
                    <form onSubmit={event=>handleSubmit(event)} >
                <div className='input-field'>
                    <input 
                        name='title'
                        type='text'
                        value={state.title}
                        placeholder='title'
                       onChange = {e=>handlChange(e)}
                        />
                </div>
                
                <div className='input-block'>
                    <input 
                        name='description'
                        type='text'
                        value={state.description}
                        placeholder='description'
                        onChange = {e=>handlChange(e)}
                        />
                </div>
                
                <button >Submit</button>
            </form>

                </div>
            }
            
            {/*all post  */}
            {
                posts.length !==0 ? <div>
                   {renderPost()}
                </div>: <div>'no post yet'</div>
            }
        </div>
    )
    
}

export default Home