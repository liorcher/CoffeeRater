import User, { IUser, UserBasicData } from "../models/user";

export const craeteNewUser = async (
  { userName }: UserBasicData,
  avatarUrl: string,
  password?: string
) => {
  try {
    const user = new User({
      userName,
      password,
      avatarUrl,
    });

    return await user.save();
  } catch (error: any) {
    throw new Error(`Error saving users: ${error.message}`);
  }
};

export const updateUserDetails = async (
  { userName, avatarUrl }: UserBasicData,
  userId: string
) => {
  try {
    const result = await User.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          userName,
          avatarUrl,
        },
      },
      {
        new: true
      }
    );

    return result;
  } catch (error: any) {
    throw new Error(`Error saving user: ${userId} ,${error.message}`);
  }
};

export const getUserById = async (userId: string) => {
  try {
    return await User.find({ userId: userId });
  } catch (error: any) {
    throw new Error(`Error saving users: ${error.message}`);
  }
};
