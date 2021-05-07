import axios from 'axios'
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")

export const getPosts = async()=>{
    return axios.get('http://localhost:5000/api/post')
}

export const createPost = async(title, description)=>{
    return axios.post('http://localhost:5000/api/post',{
        title,
        description
    })
}

export const createComment = async(id, comment)=>{
    await axios.post(`http://localhost:5000/api/post/comment/${id}`,{
        description : comment
    })
}