import axios from 'axios'

export const getPosts = async()=>{
    return axios.get('http://localhost:5000/api/post')
}

export const createPost = async(title, description)=>{
    return axios.post('http://localhost:5000/api/post',{
        title,
        description
    })
}