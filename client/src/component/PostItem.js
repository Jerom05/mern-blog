import {useEffect, useState} from 'react'
import {getPosts,createPost, createComment} from '../services/request'
const PostItem = ({post,user,makeRender})=>{
    
    const[state, setState] = useState({
        comment:''
    })
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
                    English grammar is the way in which meanings are encoded into wordings in the English language. This includes the structure of words, phrases, clauses, sentences, and whole texts. ... Nouns form the largest word class, and verbs the second-largest.
                </div>
                <hr />
                <div className="comment-div"> 
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
                
            </div>
        </div>
    )}
    
export default PostItem


/*

import {useEffect, useState} from 'react'
const PostItem = ({post})=>{
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
                    English grammar is the way in which meanings are encoded into wordings in the English language. This includes the structure of words, phrases, clauses, sentences, and whole texts. ... Nouns form the largest word class, and verbs the second-largest.
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
                     </div>
                    : null
                }
            </div>
        </div>
    )}
    
export default PostItem

*/ 