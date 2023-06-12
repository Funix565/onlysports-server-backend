import express from "express";
import { getFeedPosts, getUserPosts, likePost, getTeamPosts } from "../controllers/posts.js";
import { checkMembership, verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// This will grab the user feed when we are on the home page.
router.get("/", verifyToken, getFeedPosts);
// This will grab only the user's posts.
router.get("/:userId/posts", verifyToken, getUserPosts);
// This will grab private team posts from trainer
router.get("/:trainerId/teamPosts", verifyToken, checkMembership, getTeamPosts);

/* UPDATE */
// TODO: Think about protecting private post.
//  Ideally, only trainer and members can like them.
//  But this requires additional logic and checks. Can't be implemented in middleware, I guess
router.patch("/:id/like", verifyToken, likePost);

export default router;