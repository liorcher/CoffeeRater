const mockingoose = require("mockingoose");
import User from "../src/models/user";

describe("User Model Test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should find a user by email", async () => {
    const userDoc = {
      _id: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439011",
      userName: "johndoe",
      avatarUrl: "http://example.com/avatar.jpg",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "hashedpassword",
    };

    // Mock the findOne method of the User model
    mockingoose(User).toReturn(userDoc, "findOne");

    const user = await User.findOne({ email: "john@example.com" });

    expect(user).toBeTruthy();
    expect(user?.userName).toBe("johndoe");
    expect(user?.email).toBe("john@example.com");
  });

  it("should create a new user", async () => {
    const userDoc = {
      _id: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439011",
      userName: "janedoe",
      avatarUrl: "http://example.com/avatar2.jpg",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "hashedpassword",
    };

    // Mock the save method of the User model
    mockingoose(User).toReturn(userDoc, "save");

    const user = new User({
      userName: "janedoe",
      avatarUrl: "http://example.com/avatar2.jpg",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "hashedpassword",
    });

    const savedUser = await user.save();

    expect(savedUser).toBeTruthy();
    expect(savedUser.userName).toBe("janedoe");
    expect(savedUser.email).toBe("jane@example.com");
  });

  it("should update a user", async () => {
    const userDoc = {
      _id: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439011",
      userName: "johnsmith",
      avatarUrl: "http://example.com/avatar.jpg",
      firstName: "John",
      lastName: "Smith",
      email: "johnsmith@example.com",
      password: "hashedpassword",
    };

    // Mock the findOneAndUpdate method of the User model
    mockingoose(User).toReturn(userDoc, "findOneAndUpdate");

    const updatedUser = await User.findOneAndUpdate(
      { email: "john@example.com" },
      { userName: "johnsmith", email: "johnsmith@example.com" },
      { new: true }
    );

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.userName).toBe("johnsmith");
    expect(updatedUser?.email).toBe("johnsmith@example.com");
  });

  it("should delete a user", async () => {
    const userDoc = {
      _id: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439011",
      userName: "johndoe",
      avatarUrl: "http://example.com/avatar.jpg",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "hashedpassword",
    };

    // Mock the findOneAndDelete method of the User model
    mockingoose(User).toReturn(userDoc, "findOneAndDelete");

    const deletedUser = await User.findOneAndDelete({
      email: "john@example.com",
    });

    expect(deletedUser).toBeTruthy();
    expect(deletedUser?.userName).toBe("johndoe");
    expect(deletedUser?.email).toBe("john@example.com");
  });
});
