import express from "express";
// import controllers
import { checkMembership, checkTrainerRole, verifyToken } from "../middleware/auth.js";
import {
    addRemoveMember,
    getTeamMembers,
    getTrainer,
    updateCalendarIframe,
    updateWallet
} from "../controllers/trainers.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getTrainer);
router.get("/:id/members", verifyToken, checkMembership, getTeamMembers);

/* UPDATE */
router.patch("/:id/members/:memberId", verifyToken, checkTrainerRole, addRemoveMember);

// update calendarIframe
router.patch("/:id/calendar", verifyToken, checkTrainerRole, updateCalendarIframe);

// update walletAddress
router.patch("/:id/wallet", verifyToken, checkTrainerRole, updateWallet);

export default router;
