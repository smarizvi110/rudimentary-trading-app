import { User } from "../models/user.js";


export const addUser = async (req, res) => {
    try {
        const { username, password, itemsOwned } = req.body;
        const newUser = new User({
            username,
            password,
            itemsOwned,
            trades: [],
            offers: []
        });
        await newUser.save();
        res.status(201).json({message: "User added successfully.", user: newUser});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Username is already taken, please choose another one." });
        }
        res.status(500).json({ message: "Failed to register user." });
    }
};

export const authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        res.status(200).json({ message: "User authenticated successfully.", user: user });
    } catch (error) {
        res.status(500).json({ message: "Failed to authenticate user." });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
};

export const updateUserPassword = async (req, res) => {
    const { username } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { password: newPassword },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
