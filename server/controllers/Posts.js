import Post from "../models/Post.js";
import User from "../models/User.js";

//create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath} = req.body;
        const user = await user.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
            comments: {},           
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message:err.message});
    }
}

//read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message:err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message:err.message});
    }
}

//update
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.liked.get(userId);

        if (isLiked) {
            post.liked.delete(userId);
        } else {
            post.liked.set(userId, true);
        }

        const updatedPost = await post.findByIdAndupdate( id,
            id,
            { likes: post.likes },
            { new: true }  
        );
        
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message:err.message});
    }
}




    
