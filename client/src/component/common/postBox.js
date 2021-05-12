import React from 'react'
import {useState} from 'react'
import {createPost} from '../../services/request'
import './postBox.css'

const PostBox = ({makeRender})=>{
    const [state, setState] = useState({
        title:'',
        description:'',
        render:true
    })

    const handleSubmit =async (event)=>{
        event.preventDefault()
        await createPost(state.title,state.description)
        setState({...state, title:'', description:''})
        makeRender()
    }

    return(
        <div>
            <div className="title-box">
                <p>Title</p>
                <textarea                                   
                    value={state.title}
                    onChange={e=>setState({...state, title:e.target.value})}>
                </textarea>
            </div>
            <div className="description-box">
                <p>description</p>
                <textarea
                    value={state.description}
                    onChange={e=>setState({...state, description:e.target.value})}
                ></textarea>
            </div>
            <button onClick={e=>handleSubmit(e)}>Post</button>
        </div>
    )
}

export default PostBox