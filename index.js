import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js"
import trainerRoutes from "./routes/trainers.js"
import { register, registerTrainer } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js"
import Post from "./models/Post.js";
import Trainer from "./models/Trainer.js";
import { users, posts, trainers } from "./data/index.js";

/* 
    CONFIGURATIONS
    middle ware, different package conf
    smth that runs in between different requests
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// Create a virtual path prefix, use absolute path of the directory that we want to serve. https://expressjs.com/en/starter/static-files.html
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* ROUTES WITH FILES*/
// Use multer anyway. Later we can access saved files and upload them
app.post("/auth/register", upload.single("picture"), register);
app.post("/auth/registerTrainer", upload.single("picture"), registerTrainer);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
// "/auth" is a prefix
app.use("/auth", authRoutes);
// "/users" is a prefix
app.use("/users", userRoutes);
// "/posts" is a prefix
app.use("/posts", postRoutes);
// "/trainers" is a prefix
app.use("/trainers", trainerRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
    // Trainer.insertMany(trainers);
}).catch((error) => console.log(`${error} did not connect`));
