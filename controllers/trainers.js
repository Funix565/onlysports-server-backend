import Trainer from "../models/Trainer.js";
import User from "../models/User.js";

/* READ */
export const getTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        const trainer = await Trainer.findById(id);
        // 200 -- OK
        res.status(200).json(trainer);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

export const getTeamMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const trainer = await Trainer.findById(id);

        const members = await Promise.all(
            trainer.members.map((id) => User.findById(id))
        );

        const formattedMembers = members.map(
            ({_id, fullName, occupation, location, picturePath}) => {
                return {_id, fullName, occupation, location, picturePath};
            }
        );

        // 200 -- OK
        res.status(200).json(formattedMembers);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

// Only trainer can add.
// Add only users. If user doesn't have trainerId set.
// Can't add other trainers
export const addRemoveMember = async (req, res) => {
    try {
        const { id, memberId } = req.params;

        // Users can't add themselves to the list
        if (id === memberId) {
            // 400 -- Bad Request
            return res.status(400).send("Bad Request");
        }

        const trainer = await Trainer.findById(id);
        const member = await User.findById(memberId);

        if (member.trainerId && member.trainerId !== id) {
            // 409 -- Conflict
            return res.status(409).send("User is already in another team. ");
        }

        if (trainer.members.includes(memberId)) {
            // Cancel membership
            trainer.members = trainer.members.filter((id) => id !== memberId);
            member.trainerId = "";
        } else {
            // Add member to trainer members. And trainer as member's trainerId
            trainer.members.push(memberId);
            member.trainerId = id;
        }

        await trainer.save();
        await member.save();

        const members = await Promise.all(
            trainer.members.map((id) => User.findById(id))
        );

        const formattedMembers = members.map(
            ({_id, fullName, occupation, location, picturePath}) => {
                return {_id, fullName, occupation, location, picturePath};
            }
        );

        // 200 -- OK
        res.status(200).json(formattedMembers);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

export const updateCalendarIframe = async (req, res) => {

    console.log("updateCalendarIframe");

    try {
        const { id } = req.params;
        const { calendarIframe } = req.body;
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            id,
            { calendarIframe: calendarIframe },
            { new: true }
        );

        // 200 -- OK
        res.status(200).json(updatedTrainer);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

export const updateWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const { walletAddress } = req.body;
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            id,
            { walletAddress: walletAddress },
            { new: true }
        );

        // 200 -- OK
        res.status(200).json(updatedTrainer);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
}
