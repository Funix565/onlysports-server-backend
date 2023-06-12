import jwt from 'jsonwebtoken';
import { Roles } from "../shared/roles.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            // 403 -- Forbidden
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message })
    }
};

// Check who tries to access this route.
// Only logged in trainer. Or only logged in team member.
export const checkMembership = async (req, res, next) => {
    try {
        // req.user set in verifyToken
        const { role, id: payloadId } = req.user;
        const { id: paramId } = req.params;

        // If role===trainer, grab _id from payload and compare with route :id.
        if (role === Roles.Trainer) {
            if (payloadId !== paramId) {
                // 403 -- Forbidden
                return res.status(403).send("Access Denied");
            }
        }
        // If role===user, grab _id from payload, find user, check route :id === field trainerId.
        else if (role === Roles.User) {
            const user = await User.findById(payloadId);
            if (user.trainerId !== paramId) {
                // 403 -- Forbidden
                return res.status(403).send("Access Denied");
            }
        }

        next();
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message })
    }
};

// I have no idea how to make checkMembership reusable. So, another middleware.
// Anyway, checkMembership is for one use case: team access, for trainer and user.
// checkTrainerRole is for trainers only: only logged in trainers can add members to their teams and update calendars
export const checkTrainerRole = async (req, res, next) => {

    console.log("checkTrainerRole");

    try {
        // Check jwt payload.
        const { role, id: payloadId } = req.user;
        const { id: paramId } = req.params;

        console.log(paramId);

        // Only trainer can add/remove members.
        if (role !== Roles.Trainer) {
            // 403 -- Forbidden
            return res.status(403).send("Access Denied");
        }

        // grab _id and compare with route :id.
        if (payloadId !== paramId) {
            // 403 -- Forbidden
            return res.status(403).send("Access Denied");
        }

        console.log("before next, ok?")
        next();
    } catch (err) {
        // 500 -- Internal Server Error
        res.status(500).json({ error: err.message })
    }
};
