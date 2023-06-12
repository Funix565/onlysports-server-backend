import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
    {
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
        members: {
            type: Array,
            default: []
        },
        headline: {
            type: String,
            required: true
        },
        // TODO: Need this field for Post model
        //  Check this field in all Trainer feature
        location: String,
        careerStart: {
            type: Date,
            required: true
        },
        walletAddress: {
            type: String,
            minLength: 42,
            maxLength: 42,
            default: "0x0000000000000000000000000000000000000000"
        },
        calendarIframe: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);
export default Trainer;
