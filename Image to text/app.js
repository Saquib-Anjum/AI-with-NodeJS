const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require("dotenv").config();
const path = require("path");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"),
            mimeType,
        },
    };
}

const run = async () => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Tell me about this image.";
        
        const imagePart = fileToGenerativePart("./img1.png", "image/png");

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = await result.response.text(); // Ensure correct extraction
        
        console.log(responseText);
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

run();
