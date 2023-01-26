import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

        const newUser = new User({
            fullName,
            email,
            password: passwordHash,
            picturePath,
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

/* LOGGING IN */
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // Delete the password so it doesn't get sent back to the front end
        delete user.password;
        // 200 -- OK
        res.status(200).json({ token, user });

    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message });
    }
}