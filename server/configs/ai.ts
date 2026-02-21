import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables. Please add GEMINI_API_KEY to your .env file.");
}

const ai = new GoogleGenAI({
      apiKey: apiKey
});

export default ai;
