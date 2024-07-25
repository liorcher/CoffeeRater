import axios from "axios";

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not defined");
}

interface ChatGPTRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: { message: { role: string; content: string } }[];
}

export const sendChatGPTQuery = async (prompt: string): Promise<string> => {
  const requestBody: ChatGPTRequest = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
    temperature: 0.7,
  };

  try {
    const response = await axios.post<ChatGPTResponse>(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const { data } = response;
    const message = data.choices[0].message.content;
    return message;
  } catch (error: any) {
    throw new Error(`Error querying ChatGPT API: ${error.message}`);
  }
};
