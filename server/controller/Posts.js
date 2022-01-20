import mongoose from 'mongoose';
import postSchema from '../models/postSchema.js';

export const getPost = async (req, res) => {
    try {
        const posts = await postSchema.find();

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    const Post = req.body;

    const newPost = postSchema({ ...Post });
    
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);        
    }
}

export const likePost = async (req, res) => {

    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId(id)) return res.status(404).send("Post Not Found");

        const Post = await postSchema.findById(id);

        const updatedPost = await postSchema.findById(id, { likes: Post.likes++}, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}