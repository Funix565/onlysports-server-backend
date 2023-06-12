import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // 200 -- OK
        res.status(200).json(user);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, fullName, occupation, location, picturePath }) => {
                return { _id, fullName, occupation, location, picturePath };
            }
        );

        // 200 -- OK
        res.status(200).json(formattedFriends);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        // Users can't add themselves to the friend list.
        if (id === friendId) {
            // 400 -- Bad Request
            return res.status(400).send("Users can't add themselves to the friend list. ");
        }

        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        
        if (user.friends.includes(friendId)) {
            // Remove friends from both users
            user.friends = user.friends.filter((id) => id !== friendId);
            // !REALLY IMPORTANT FIX HERE: was \(id) => id !== id\ -- shadow var scope, unexpected behaviour with friends
            friend.friends = friend.friends.filter((friendId) => friendId !== id);
        } else {
            // Add them to the friendlist
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, fullName, occupation, location, picturePath }) => {
                return { _id, fullName, occupation, location, picturePath };
            }
        );

        // 200 -- OK
        res.status(200).json(formattedFriends);
    } catch (err) {
        // 404 -- Not Found
        res.status(404).json({ message: err.message });
    }
};
