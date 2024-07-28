import { Request, Response } from "express";
import { getUserById, updateUserDetails } from "../dal/user.dal";

export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    let userDetails = await getUserById(userId);

    res.json(userDetails);
  } catch (err) {
    res.status(500).send(`Error retriving user ${userId}.`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId, userName, firstName, lastName, email, avatarUrl } = req.body;

  try {
    let updatedUser = await updateUserDetails(
      {
        userName,
        firstName,
        lastName,
        email,
        avatarUrl,
      },
      userId
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(`Error updating user ${userId}.`);
  }
};
