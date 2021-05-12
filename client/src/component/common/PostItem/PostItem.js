import {useEffect, useState} from 'react'
import { createComment} from '../../../services/request'
import './PostItem.css'
const PostItem = ({post,user,makeRender})=>{
    const[state, setState] = useState({
        comment:''
    })
    const [Comment, setComment] = useState(false)
    useEffect(()=>{

    },[state.comment])
    const makeComment = async(id) =>{
        try{
            await createComment(id, state.comment)
            setState({...state, comment:''})
            makeRender()
            
        }catch(er){
            console.log(er)
        }  
    }
    const openComment = ()=>{
        if(Comment) setComment(false)
        else setComment(true)
    }
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
                </div>
                <br/>
                <hr/>
                <span onClick={()=>openComment()}>Comment</span>
                
                <div className="comment-div">
                    {
                        Comment &&(
                            <div>
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
                                    value={state.comment}
                                    onChange={(e)=>setState({comment:e.target.value})}
                                    form="usrform" 
                                    placeholder="Comment here">
                                </textarea>
                            </div>
                            <div onClick ={()=>makeComment(post._id)} className="comment-submit-button">
                                Comment 
                            </div>
                         </div>
                        : null
                    }
                            </div>
                        )
                    }
                </div>
                
            </div>
        </div>
    )}
    
export default PostItem