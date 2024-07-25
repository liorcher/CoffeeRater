import { sendChatGPTQuery } from "../services/chatgpt.service";
import { mealQuery } from "./queries/nutrition.queries";

export const getMealPlan = async () => {
  try {
    const response = await sendChatGPTQuery(mealQuery);
    return { response };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
