/* eslint-disable no-undef */

// import {
//   createTask,
//   updateTask,
//   getAllTasks,
//   getCurrentUserTasks,
//   deleteTask,
//   deleteAllTasks,
//   getTaskHistory,
// } from "../controllers/task";

// import connectDB from "../index";

describe("Tasks API Suite", () => {
  beforeAll(async () => {
    await connectDB();
    // await login();
  });

  describe(" Create Task API", () => {
    it("should fail to create if user is not logged in", () => {});
    it("should fail to create if title title is missing", () => {});
    it("should fail to create if title description is missing", () => {});
    it("should fail to create if title due date is missing", () => {});
    it("should successfully create a task with valid payload", () => {});
  });

  describe(" Update Task API", () => {
    it("should fail to create if user is not logged in", () => {});
    it("should fail to create if another user tries to update someone's else task", () => {});
    it("should successfully update a task with partial payload - title", () => {});
    it("should successfully update a task with partial payload - description", () => {});
    it("should successfully update a task with partial payload - due date", () => {});
    it("should successfully update a task with partial payload - reminder", () => {});
    it("should successfully update a task with partial payload - status", () => {});
    it("should successfully update a task with completely new valid payload", () => {});
  });

  describe(" Get All Tasks API", () => {
    it("should fail to get all tasks for user role", () => {});
    it("should successfully get all tasks for admin role", () => {});
  });

  describe(" Get Current User Tasks API", () => {
    it("should fail get tasks if another user tries to get someone's else tasks", () => {});
    it("should successfully get all tasks for valid user", () => {});
  });

  describe(" Delete Task API", () => {
    it("should fail to create if user is not logged in", () => {});
    it("should fail to create if another user tries to delete someone's else task", () => {});
    it("should successfully delete a task for valid user", () => {});
  });

  describe(" Delete All Tasks API", () => {
    it("should fail to delete all tasks for user role", () => {});
    it("should successfully delete all tasks for admin role", () => {});
  });

  describe(" Get Task History API", () => {
    it("should fail get task history if another user tries to get someone's else tasks", () => {});
    it("should successfully get task history for valid user", () => {});
  });
});
