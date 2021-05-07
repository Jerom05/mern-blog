import {useState,useEffect} from 'react'
import {getPosts,createPost, createComment} from '../services/request'
import jwtDecode from 'jwt-decode'
import './Home.css'
const Home = ()=>{
    const [posts, setPost] = useState([{title:"English Grammer", comments:[{name:"Jerom", text:'Thankyou'}]}])
    const [user, setUser] = useState(null)
    const [state, setState] = useState({
        title:'',
        description:'',
        comment: '',
        commentValue: ''
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
    },[posts])

    const handlChange = (e)=>{
        const property = e.target.name
        state[property] = e.target.value
        setState({...state})
    }

    const handleSubmit =async (event)=>{
        event.preventDefault()
        await createPost(state.title,state.description)
        setState({...state, title:'', description:''})
        setPost([...posts])
    }

    const makeComment = async(id) =>{
        await createComment(id, state.comment)
        setPost([...posts])
    }

    const renderPost = ()=>{
        return(
            <div>
                {posts.map(post=>{
                    return(
                        <div className= "post">
                            <div className="content">
                                <div className="title-date-contianer">
                                    <div className="title">
                                        <h1>{post.title}</h1>
                                    </div>
                                    <div className="date">
                                        <p></p>
                                    </div>
                                </div>
                                <div className="author">
                                    <span>Posted By {post.author}</span>
                                </div>

                                <hr />
                                <div className="description">
                                    {post.description}
                                    something
                                    {/* English grammar is the way in which meanings are encoded into wordings in the English language. This includes the structure of words, phrases, clauses, sentences, and whole texts. ... Nouns form the largest word class, and verbs the second-largest. */}
                                </div>
                                <hr />

                                {post.comments.map((comment,index)=>(
                                    <div className='comment'>
                                        <div>
                                            <h3>{comment.name}</h3>
                                            <p>{comment.description}</p>
                                        </div>
                                    </div>
                                ))}

                                { user ? 
                                    <div className='comment-section'>
                                        <div className="comment-box-input">
                                            <textarea 
                                                name="comment" 
                                                onClick={()=> setState({...state, commentValue:post._id, comment:''})}
                                                value = {state.commentValue === post._id ? state.comment : null}
                                                onChange={(e)=>handlChange(e)}
                                                form="usrform" 
                                                placeholder="Comment here">
                                            </textarea>
                                        </div>
                                        <div onClick ={()=>makeComment(post._id)} className="comment-submit-button">
                                            Comment 
                                        </div>
                                        {post._id}
                                     </div>
                                    : null
                                }
                            </div>
                        </div>
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
