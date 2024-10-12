import express from "express"; 
import Chat from "../models/Chat.js"; 
import User from "../models/User.js"; 
import Router from "express"

const router = Router(); // Initialize the router

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Patch a chat message by ID
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the chat ID from the route parameters

    // Find the chat message by ID
    const findChat = await Chat.findById(id);  
    if (!findChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Update the chat message with the provided data
    const updatedChat = await findChat.updateOne(req.body);
    
    // Optionally fetch the updated chat message to send back
    const updatedMessage = await Chat.findById(id);
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router
export default router;
