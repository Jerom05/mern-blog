const express = require('express')
const {Post,Validation} = require('../model/Post')
const {User} = require('../model/user')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all Posts 
router.get('/',async (req,res)=>{
    const post = await Post.find().sort({date:-1})
    res.status(200).send(post)
})

//my posts
router.get('/myposts',auth,async (req,res)=>{
    const posts = await Post.find().sort({date:-1})
    const myposts = posts.filter(post=>post.authorid.toString()===req.user._id)
    
    console.log('my post',req.user._id )
    res.status(200).send(myposts)
})

// Create a new Post
router.post('/',[auth], async(req, res)=>{
    const {error} = Validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const author = await User.findById(req.user._id)    
    let post = new Post({
        authorid: author._id,
        author: author.name,
        title: req.body.title,
        description:req.body.description
    })
    await post.save()
    res.send(post)
})

// Find Specific Post
router.get('/:id', async(req,res)=>{

    const post = await Post.findById(req.params.id)
    if(!post)
        return res.status(400).send('This post is not found.')
        
    res.status(200).send(post)
})
    
// Update a post
router.put('/:id', async(req,res)=>{
    const {title, description} = req.body
    const post = await Post.findById(req.params.id)
    
    if(!post) return res.status(400).send('This post is not found.')

    const updatePost = await Post.findByIdAndUpdate(req.params.id, { 
        title,
        description
     }, {new: true})


    res.send(updatePost)
})

//Delete a post 

router.delete('/:id', async(req,res)=>{
    const post = await Post.findByIdAndRemove(req.params.id)
    
    if(!post) 
        return res.status(400).send('This post is not found.')

    res.send(post)
})


router.post('/comment/:id',[auth], async(req, res)=>{
   
    //const {error} = Validation(req.body)
    //if (error) return res.status(400).send(error.details[0].message)
   
    const user = await User.findById(req.user._id)
    let post = await Post.findById(req.params.id)
    
    
    if(!post) return res.status(400).send('This post is not found.')

    let postComment = {
        userid:user._id,
        name: user.name,
        description:req.body.description,
    }

    post.comments.push(postComment)
    await post.save()
    res.send(postComment)
})


router.put('/comment/:id/:comment_id',[auth], async(req,res)=>{
    
    const user = await User.findById(req.user._id)
    let post = await Post.findById(req.params.id)

    if(!post) return res.status(400).send('This post is not found.')
   
    let FindIndex = ()=>{
        for(let i = 0 ; i<post.comments.length; i++){
            if((post.comments[i]._id).toString()===req.params.comment_id){
                return i
            }
        }
    }

    const index = FindIndex()
    console.log(index)
    
    const comment = {
        userid:user._id,
        name: user.name,
        description:req.body.description,
    }
    post.comments[index]=comment
    const updateComment = post.comments

    await Post.findByIdAndUpdate(req.params.id, {comments: updateComment })
    post = await Post.find()
    res.send(post)
    
})

module.exports = router 