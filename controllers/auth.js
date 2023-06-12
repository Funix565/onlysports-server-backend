import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Trainer from "../models/Trainer.js"
import {uploadToImgbb} from "../middleware/uploader.js";
import {Roles} from "../shared/roles.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Here we can upload image to IMGBB and use returned link later
        // I don't think that it is a bad approach. Uploading is isolated in a separate function.
        // We just use its functionality as bcrypt, that's all

        const picturePathUrl = await uploadToImgbb(picturePath);
        // const picturePathUrl = await uploadToBucket(picturePath);

        const newUser = new User({
            fullName,
            email,
            password: passwordHash,
            picturePath: picturePathUrl,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        // 201 -- Created
        res.status(201).json(savedUser);
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message });
    }
};

/* REGISTER TRAINER */
export const registerTrainer = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            picturePath,
            members,
            headline,
            careerStart
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const picturePathUrl = await uploadToImgbb(picturePath);

        const newTrainer = new Trainer({
            fullName,
            email,
            password: passwordHash,
            picturePath: picturePathUrl,
            members,
            headline,
            careerStart
        });
        const savedTrainer = await newTrainer.save();
        // 201 -- Created
        res.status(201).json(savedTrainer);
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN USER */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Using mongoose to find one User
        const user = await User.findOne({ email: email });
        // 400 -- Bad Request
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        // We store hash in our DB. We need to compare the provided password with the stored one.
        const isMatch = await bcrypt.compare(password, user.password);
        // 400 -- Bad Request
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        // TODO: Add USER role to payload
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // Delete the password, so it doesn't get sent back to the front end
        delete user.password;
        // 200 -- OK
        res.status(200).json({ token, user });
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN TRAINER */
export const loginTrainer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trainer = await Trainer.findOne({ email: email });
        // 400 -- Bad Request
        if (!trainer) return res.status(400).json({ msg: "Trainer does not exist. " });

        const isMatch = await bcrypt.compare(password, trainer.password);
        // 400 -- Bad Request
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign(
            {
                id: trainer._id,
                role: Roles.Trainer
            },
            process.env.JWT_SECRET
        );
        delete trainer.password;
        // 200 -- OK
        res.status(200).json({ token, trainer });
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message });
    }
};
