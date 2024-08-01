const mockingoose = require("mockingoose");
import { Comment } from "../src/models/comment";

jest.setTimeout(30000);

describe("Comment Model Test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should find a comment by postId", async () => {
    const commentDoc = {
      _id: "507f1f77bcf86cd799439011",
      commentId: "comment1",
      postId: "post1",
      userId: "user1",
      content: "This is a comment",
      rating: 5,
      commentTime: new Date(),
      updateTime: new Date(),
      isDeleted: false,
    };

    // Mock the findOne method of the Comment model
    mockingoose(Comment).toReturn(commentDoc, "findOne");

    const comment = await Comment.findOne({ postId: "post1" });

    expect(comment).toBeTruthy();
    expect(comment?.content).toBe("This is a comment");
    expect(comment?.userId).toBe("user1");
  });

  it("should create a new comment", async () => {
    const commentDoc = {
      _id: "507f1f77bcf86cd799439011",
      commentId: "comment1",
      postId: "post1",
      userId: "user1",
      content: "This is a comment",
      rating: 5,
      commentTime: new Date(),
      updateTime: new Date(),
      isDeleted: false,
    };

    // Mock the save method of the Comment model
    mockingoose(Comment).toReturn(commentDoc, "save");

    const comment = new Comment({
      commentId: "comment1",
      postId: "post1",
      userId: "user1",
      content: "This is a comment",
      commentTime: new Date(),
      rating: 5,
    });

    const savedComment = await comment.save();

    expect(savedComment).toBeTruthy();
    expect(savedComment.content).toBe("This is a comment");
    expect(savedComment.userId).toBe("user1");
  });

  it("should update a comment", async () => {
    const commentDoc = {
      _id: "507f1f77bcf86cd799439011",
      commentId: "comment1",
      postId: "post1",
      userId: "user1",
      content: "Updated comment",
      rating: 4,
      commentTime: new Date(),
      updateTime: new Date(),
      isDeleted: false,
    };

    // Mock the findOneAndUpdate method of the Comment model
    mockingoose(Comment).toReturn(commentDoc, "findOneAndUpdate");

    const updatedComment = await Comment.findOneAndUpdate(
      { commentId: "comment1" },
      { content: "Updated comment", rating: 4 },
      { new: true }
    );

    expect(updatedComment).toBeTruthy();
    expect(updatedComment?.content).toBe("Updated comment");
    expect(updatedComment?.rating).toBe(4);
  });

  it("should delete a comment", async () => {
    const commentDoc = {
      _id: "507f1f77bcf86cd799439011",
      commentId: "comment1",
      postId: "post1",
      userId: "user1",
      content: "This is a comment",
      rating: 5,
      commentTime: new Date(),
      updateTime: new Date(),
      isDeleted: false,
    };

    // Mock the findOneAndDelete method of the Comment model
    mockingoose(Comment).toReturn(commentDoc, "findOneAndDelete");

    const deletedComment = await Comment.findOneAndDelete({
      commentId: "comment1",
    });

    expect(deletedComment).toBeTruthy();
    expect(deletedComment?.content).toBe("This is a comment");
    expect(deletedComment?.userId).toBe("user1");
  });
});
