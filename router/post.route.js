const { Router } = require("express");
const { PostModel } = require(".././model/post.model");

require("dotenv").config()


const postController = Router();

//GET REQUEST;

postController.get("/", async (req, res) => {
    if(req.query.device1 && req.query.device2){
        
    }
    if (req.query.device) {
        const post = await PostModel.find({ userId: req.body.userId, device: req.query.device });
        if (!post) {
            return res.send("no device found")
        }
        return res.send(post);
    }

    const post = await PostModel.find({ userId: req.body.userId })
    res.send(post);
})

//POST REQUEST 

postController.post("/", async (req, res) => {
    const { title, body, device, userId } = req.body;


    const post = new PostModel({
        title, body, device, userId
    })
    try {
        await post.save()
        res.send({ "msg": "post created" })
    }
    catch (err) {
        res.send({ "msg": "something went wrong try again later" })
        console.log(err)
    }
})


//DELETE REQUEST
postController.delete("/delete/:postId", async (req, res) => {
    const { postId } = req.params;

    const deletePost = await PostModel.findOneAndDelete({ _id: postId, userId: req.body.userId });
    if (deletePost) {
        res.send({ "msg": "post Deleted" })
    } else {
        res.send({ "msg": "couldn't delete" })
    }
})


//PATCH REQUEST

postController.patch("/update/:postId", async (req, res) => {
    const { postId } = req.params;

    const updatePost = await PostModel.findOneAndUpdate({ _id: postId, userId: req.body.userId }, req.body)
    if (updatePost) {
        res.send({ "msg": "post updated" })
    } else {
        res.send({ "msg": "Something went wrong" })
    }
})

module.exports = { postController }