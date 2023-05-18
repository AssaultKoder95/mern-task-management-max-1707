import express from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getCurrentUserTasks,
  updateTask,
  setReminder,
  getTaskHistory,
} from "../controllers/task.js";

const router = express.Router();

router.get("/all", getAllTasks);

router.post("/", createTask);

router.put("/:taskId", updateTask);

router.post("/set-reminder/:taskId", setReminder);

router.get("/myTasks", getCurrentUserTasks);

router.get("/:taskId/history", getTaskHistory);

router.delete("/deleteAll", deleteAllTasks);

router.delete("/:taskId", deleteTask);

export default router;
