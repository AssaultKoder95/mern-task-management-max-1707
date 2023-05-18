/* eslint-disable no-undef */
// const request = require("supertest");
// const app = require("../index");

// const baseURL = "http://localhost:8000/api";

describe("Auth API Suite", () => {
  describe("Register API", async () => {
    // const response = await request(app).post("/auth/register").send({
    //   email: "ak@test.com",
    //   name: "Abhishek",
    //   password: "testPassword@abhi101",
    // });

    // console.log(response.data);

    it("should successfully register a user", () => {});
    it("should fail when same user tries to register again", () => {});
  });

  describe("Login API", () => {
    it("should successfully login a user when credentials are correct", () => {});
    it("should fail login a user when credentials are incorrect", () => {});
  });

  describe("IsLoggedIn API", () => {
    it("should successfully get the state of user as loggedIn true when user logged in", () => {});
    it("should successfully get the state of user as false when when user is not logged in", () => {});
  });

  describe("Logout API", () => {
    it("should successfully log out the user", () => {});
  });

  describe("Reset Password API", () => {
    // WIP
  });
  describe("Update Password API", () => {
    // WIP
  });
});
