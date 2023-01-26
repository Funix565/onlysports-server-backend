import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* The read-routes represent routes where we grab information. */
// Prefixed with "/users"
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// We need both the current user ID and the friend ID of who we want to add or remove.
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;