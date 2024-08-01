import { Request, Response } from "express";
import { getUserById, updateUserDetails } from "../dal/user.dal";

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     description: Retrieves details of a user by their user ID.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatarUrl:
 *                   type: string
 *       500:
 *         description: Error retrieving user details.
 */
export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    let userDetails = await getUserById(userId);
    console.log(userDetails)
    res.json(userDetails[0]);
  } catch (err) {
    res.status(500).send(`Error retriving user ${userId}.`);
  }
};

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update user details
 *     description: Updates details of a user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatarUrl:
 *                   type: string
 *       500:
 *         description: Error updating user details.
 */
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
