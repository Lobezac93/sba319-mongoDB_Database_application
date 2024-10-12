import express from "express";
import Router from "express";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(findUser, req.body);
    const updatedUser = await findUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
