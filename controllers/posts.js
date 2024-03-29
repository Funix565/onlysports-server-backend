import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToImgbb } from "../middleware/uploader.js";
import { Roles } from "../shared/roles.js";
import Trainer from "../models/Trainer.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath, isPrivate: isPrivateStr} = req.body;
        const isPrivate = JSON.parse(isPrivateStr);

        const {role} = req.user;

        // Only trainer can create private post
        if (role === Roles.User && isPrivate === true) {
            // 403 -- Forbidden
            return res.status(403).send("Access Denied");
        }

        // Trainer and User can create public posts
        const poster = ((role === Roles.User)
            ? await User.findById(userId)
            : await Trainer.findById(userId));

        // Here we can upload image to IMGBB and use returned link later
        // I don't think that it is a bad approach. Uploading is isolated in a separate function.
        // We just use its functionality as User.findById, that's all

        // Handle case when Post without image
        const picturePathUrl = picturePath ? await uploadToImgbb(picturePath) : "";
        // const picturePathUrl = await uploadToBucket(picturePath);

        const newPost = new Post({
            userId,
            fullName: poster.fullName,
            location: poster.location,
            description,
            userPicturePath: poster.picturePath,
            picturePath: picturePathUrl,
            likes: {},
            comments: [],
            isPrivate
        })
        await newPost.save();

        // Get all the posts with a new one. Check isPrivate
        if (isPrivate === false) {
            // Grab all public posts when new created -- means in feed
            const post = await Post.find({isPrivate: 'false'}).sort({createdAt: 'desc'});
            // 201 -- Created
            res.status(201).json(post);
        } else if (isPrivate === true) {
            // Grab only poster-trainer private posts -- means in team
            const post = await Post.find({userId: userId, isPrivate: 'true'}).sort({createdAt: 'desc'});
            // 201 -- Created
            res.status(201).json(post);
        }
    } catch (err) {
        // 409 -- Conflict
        res.status(409).json({message: err.message})
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find({isPrivate: 'false'}).sort({createdAt: 'desc'});

        // 200 -- OK
        res.status(200).json(post);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({message: err.message})
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId: userId, isPrivate: 'false'}).sort({createdAt: 'desc'});

        // 200 -- OK
        res.status(200).json(post);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({message: err.message})
    }
};

export const getTeamPosts = async (req, res) => {
    try {
        const {trainerId} = req.params;
        const post = await Post.find({userId: trainerId, isPrivate: 'true'}).sort({createdAt: 'desc'});

        // 200 -- OK
        res.status(200).json(post);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({message: err.message})
    }
};

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        // TODO: Perhaps, extract checks in middleware. But is it ok for middleware to Access url params?
        const {role, id: payloadId} = req.user;
        const {id: paramPostId} = req.params;
        const {userId} = req.body;

        if (payloadId !== userId) {
            // 403 -- Forbidden
            return res.status(403).send("Access Denied");
        }

        const post = await Post.findById(paramPostId);

        // Post can be private or public.
        // Perform all the checks for private posts.
        if (post.isPrivate === true) {
            // Check role and membership
            if (role === Roles.Trainer) {
                // Only trainer author of this post can like it
                if (post.userId !== userId) {
                    // 403 -- Forbidden
                    return res.status(403).send("Access Denied");
                }
            } else if (role === Roles.User) {
                const user = await User.findById(userId);

                // Only user who is member of this trainer can like it
                if (user.trainerId !== post.userId) {
                    // 403 -- Forbidden
                    return res.status(403).send("Access Denied");
                }
            }
        }

        // Check pass, can like private post.
        // No checks for public post.

        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            paramPostId,
            {likes: post.likes},
            {new: true}
        );

        // 200 -- OK
        res.status(200).json(updatedPost);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({message: err.message})
    }
};
