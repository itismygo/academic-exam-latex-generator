import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateExamQuestions = async (
  subject: string,
  topic: string,
  difficulty: string,
  count: number
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are a strict university professor preparing a final exam.
      Subject: ${subject}
      Topic: ${topic}
      Difficulty: ${difficulty}
      
      Please generate ${count} exam questions in LaTeX format.
      Do not include the document preamble, just the items.
      Format them inside an 'enumerate' environment.
      Ensure mathematical equations are properly formatted with LaTeX syntax (e.g., $...$ or $$...$$).
      If the subject implies it, use Chinese for the question text, but keep standard math notation.
      
      Example Output:
      \\item Calculate the limit: $\\lim_{x \\to \\infty} (1+\\frac{1}{x})^x$.
      \\item Define the Central Limit Theorem.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "% No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "% Error generating questions. Please check your API key.";
  }
};
