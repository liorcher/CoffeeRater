import User, { IUser, UserBasicData } from "../models/user";

export const craeteNewUser = async (
  { userName, firstName, lastName, email }: UserBasicData,
  avatarUrl: string,
  password?: string
) => {
  try {
    const user = new User({
      userName,
      firstName,
      lastName,
      email,
      password,
      avatarUrl,
    });

    return await user.save();
  } catch (error: any) {
    throw new Error(`Error saving users: ${error.message}`);
  }
};

export const updateUser = async (
  { userName, avatarUrl, firstName, lastName, email }: UserBasicData,
  userId: string
) => {
  try {
    const user = new User({
      userId,
      userName,
      firstName,
      lastName,
      email,
      avatarUrl,
    });

    return await user.save();
  } catch (error: any) {
    throw new Error(`Error saving user: ${userId} ,${error.message}`);
  }
};

export const getUserById = async (userid: string) => {
  try {
    return await User.find({ userId: userid });
  } catch (error: any) {
    throw new Error(`Error saving users: ${error.message}`);
  }
};
