const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.send("Hello world gemini");
});
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Explain about node js";
const generateResult = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
    //console.log(result.response.text());
  } catch (err) {
    console.error("Error generating result:", err);
    return "Error generating content.";
  }
};
app.get("/api/content", async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).send("Question is required");
    }
    const myResult = await generateResult(question);
    res.json({myResult:myResult});
    //res.send(myResult);
    
  } catch (err) {
    res.status(500).send("Server error");
  }
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is  running on address http://localhost:${PORT}`)
});

