
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
    const model = 'gemini-2.5-flash';
    return ai.chats.create({
        model: model,
        config: {
            systemInstruction: `You are an expert financial advisor for a rural Indonesian cooperative called "Koperasi Desa Merah Putih". Your tone should be friendly, encouraging, and easy to understand for people with varying levels of financial literacy. Use simple Bahasa Indonesia. Your goal is to provide helpful, actionable advice on personal finance, savings, understanding cooperative principles (like SHU - Sisa Hasil Usaha), and making the most of the cooperative's services. Do not give specific investment advice, but educate users on concepts. Keep responses concise and clear.`,
        },
    });
};
