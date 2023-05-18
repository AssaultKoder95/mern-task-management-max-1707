/* eslint-disable object-curly-newline */
import Task from "../models/Task.js";
import Reminder from "../models/Reminder.js";
import TaskHistory from "../models/TaskHistory.js";
import createError from "../utils/error.js";

export const setReminder = async ({ remindOn, id }) => {
  const existingReminder = await Reminder.find({ task: id });

  if (existingReminder?.length) {
    return Reminder.findByIdAndUpdate(
      { _id: existingReminder[0]._id },
      { remindOn: new Date(remindOn).getTime() }
    );
  }

  const newReminder = new Reminder({
    remindOn: new Date(remindOn).getTime(),
    task: id,
  });

  return newReminder.save();
};

export const createTask = async (req, res, next) => {
  const { title, dueDate, description, remindOn, status } = req.body;
  let savedReminder;

  try {
    const newTask = new Task({
      title,
      dueDate,
      description,
      status,
      user: req.user.id,
    });

    let savedTask = await newTask.save();
    console.log(savedTask);

    const taskHistory = new TaskHistory({
      changes: `created task - ${savedTask.title}`,
      task: savedTask._id,
    });
    await taskHistory.save();

    console.log({ savedTask, remindOn });

    if (remindOn) {
      savedReminder = await setReminder({ remindOn, id: savedTask._id });
      savedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
          reminder: savedReminder._id,
        },
        { new: true }
      );
    }

    res.status(200).json(savedTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) {
      return next(createError({ status: 404, message: "Task not found" }));
    }
    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: "It's not your todo." }));
    }

    const { title, dueDate, description, status, remindOn } = req.body;

    let updatedTask = await Task.findByIdAndUpdate(
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
      changes: `${Object.keys(req.body).join(", ")} have been updated.`,
      task: updatedTask.id,
    });
    await taskHistory.save();

    let savedReminder;

    console.log({ task, remindOn });

    if (remindOn) {
      savedReminder = await setReminder({ remindOn, id: task._id });
      updatedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
          reminder: savedReminder._id,
        },
        { new: true }
      );
    }

    return res.status(200).json(updatedTask);
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
    const tasks = await Task.find({ user: req.user.id }).populate("reminder");

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

export const getTaskHistory = async (req, res, next) => {
  try {
    const tasks = await TaskHistory.find({ task: req.params.taskId });
    return res.json(tasks);
  } catch (err) {
    return next(err);
  }
};
