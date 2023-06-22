import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        location: String,
        description: {
            type: String,
            minLength: 1,
            maxLength: 2000
        },
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments: {
            type: Array,
            default: []
        },
        isPrivate: {
            type: Boolean,
            default: "false"
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
