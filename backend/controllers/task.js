import Task from "../models/Task.js";
import Reminder from "../models/Reminder.js";
import TaskHistory from "../models/TaskHistory.js";
import createError from "../utils/error.js";

export const createTask = async (req, res, next) => {
  const { title, dueDate, description } = req.body;

  const newTask = new Task({
    title,
    dueDate,
    description,
    user: req.user.id,
  });
  try {
    const savedTask = await newTask.save();

    const taskHistory = new TaskHistory({
      changes: `created task - ${savedTask.title}`,
      task: savedTask.id,
    });
    await taskHistory.save();

    res.status(200).json(savedTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task)
      return next(createError({ status: 404, message: "Task not found" }));
    if (task.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "It's not your todo." }));

    const { title, dueDate, description, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: title || task.title,
        status: status || task.status,
        dueDate: dueDate || task.dueDate,
        description: description || task.description,
      },
      { new: true }
    );

    const taskHistory = new TaskHistory({
      changes: `updated task - ${savedTask.title}. ${Object.keys(req.body).join(
        ", "
      )} have been updated.`,
      task: updatedTask.id,
    });
    await taskHistory.save();

    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

export const setReminder = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task)
      return next(createError({ status: 404, message: "Task not found" }));
    if (task.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "It's not your todo." }));

    const { remindOn } = req.body;

    const newReminder = new Reminder({
      remindOn,
      task: task.id,
    });

    const savedReminder = await newReminder.save();

    return res.status(200).json(savedReminder);
  } catch (err) {
    return next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task.user === req.user.id) {
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
    await Task.findByIdAndDelete(req.params.taskId);
    return res.json("Task Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};

export const deleteAllTasks = async (req, res, next) => {
  try {
    await Task.deleteMany({ user: req.user.id });
    res.json("All Todo Deleted Successfully");
  } catch (err) {
    next(err);
  }
};
