import User, { IUser, UserBasicData } from "../models/user";

export const craeteNewUser = async (
  { userName, firstName, lastName, email }: UserBasicData,
  password: string,
  avatarUrl: string
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
