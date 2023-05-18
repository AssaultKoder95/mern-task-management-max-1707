/* eslint-disable no-undef */

// import {
//   createUser,
//   getAllUsers,
//   getUser,
//   updateUser,
//   getUserInfo,
// } from "../controllers/users";

// import connectDB from "../index";

describe("Users API Suite", () => {
  beforeAll(async () => {
    await connectDB();
    // await login();
  });

  describe(" Create User API", () => {
    it("should fail to create if user is not logged in", () => {});
    it("should fail to create if name is missing", () => {});
    it("should fail to create if email is missing", () => {});
    it("should fail to create if password is missing", () => {});
    it("should successfully create user with valid payload", () => {});
  });

  describe(" Update User API", () => {
    it("should fail to update if user is not logged in", () => {});
    it("should successfully update user with partial payload - name", () => {});
    it("should successfully update user with partial payload - email", () => {});
    it("should successfully update user with valid payload", () => {});
  });

  describe(" Get User API", () => {
    it("should fail to update if user is not logged in", () => {});
    it("should fail to fetch user with invalid id", () => {});
    it("should successfully fetch user with valid id", () => {});
  });

  describe(" Get All Users API", () => {
    it("should fail to update if user is not logged in", () => {});
    it("should successfully fetch all user with admin role", () => {});
  });

  describe(" Get User Info API", () => {
    it("should fail to update if user is not logged in", () => {});
    it("should successfully fetch all user info", () => {});
  });
});
