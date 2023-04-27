import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            fullName: user.fullName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        // Get all the posts with a new one
        const post = await Post.find().sort({createdAt: 'desc'});

        // 201 -- Created
        res.status(201).json(post);
    } catch (err) {
        // 409 -- Conflict
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt: 'desc'});

        // 200 -- OK
        res.status(200).json(post);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }).sort({createdAt: 'desc'});

        // 200 -- OK
        res.status(200).json(post);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message })
    }   
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        // 200 -- OK
        res.status(200).json(updatedPost);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message })
    }
}