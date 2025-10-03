import user from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const getUserById = async (req, res) => {   
    try {
        const { id } = req.params;
        const User = await user.findById(id);
        if (User) {
            res.status(200).json(User); 
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};