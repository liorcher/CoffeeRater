import { Request, Response } from "express";
import { getUserById } from "../dal/user.dal";

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
  const { userId,userName, firstName, lastName, email, password, avatarUrl } = req.body;

  try {
    
  } catch (err) {
    res.status(500).send(`Error updating user ${userId}.`);
  }
};
