import { Router } from "express";
import Task from "../models/task.js";

const router = Router();

// Create Task
router.post("/tasks", async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const task = await Task.create({ title, description, tags });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags } = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, tags, updatedAt: Date.now() },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;