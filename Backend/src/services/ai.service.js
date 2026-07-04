const { GoogleGenerativeAI } = require("@google/generative-ai");
const SYSTEM_PROMPT = require("../prompt");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_PROMPT,
});

async function generateContent(code) {
  try {
    if (!code || code.trim() === "") {
      throw new Error("Code cannot be empty.");
    }

    const prompt = `
Review the following code.

${code}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error(error.message || "Failed to generate AI response.");
  }
}

module.exports = generateContent;