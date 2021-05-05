const movies =  [
    {
        "_id": "608edd882e8ee607c8fbe9a8",
        "userid": "608eb8621346e13200e180a5",
        "name": "Jeromio Calvin",
        "description": "Hey glad to see you...",
        "date": "2021-05-02T17:12:40.520Z"
    },
    {
        "_id": "608ede9c2e8ee607c8fbe9a9",
        "userid": "608eb1ec85e11f3b8c428bc1",
        "name": "Jessica Sarah",
        "description": "Hey glad to see you...",
        "date": "2021-05-02T17:17:16.255Z"
    }
]


for(let i = 0 ; i< movies.length; i++){
    if(movies[i]._id==="608ede9c2e8ee607c8fbe9a9"){
        console.log(i)
    }
    
}






/*

router.put('/comment/:id/:comment_id',[auth], async(req,res)=>{
    
    const user = await User.findById(req.user._id)
    const post = await Post.findById(req.params.id)

    if(!post) return res.status(400).send('This post is not found.')
    
    let index = post.comments.map((comment,index)=>{
        if(comment._id===req.params.comment_id){
            return index
        }
    })
    index = index[1]
    
    const comment = {
        userid:user._id,
        name: user.name,
        description:req.body.description,
    }

    const updateComment = post.comments[index]=comment
    const updateComment = await Post.findByIdAndUpdate(req.params.id, updateComment, {new: true})

    res.send(updateComment)
})

*/
