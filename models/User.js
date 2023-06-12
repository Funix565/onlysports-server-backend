import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    trainerId: {
        type: String,
        default: ""
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
