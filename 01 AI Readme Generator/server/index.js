const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

app.post("/generate-readme", async (req, res) => {
  const { projectInput } = req.body;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Generate a clean, professional, and visually appealing README.md file for the following project. Use cool and relevant emojis to enhance readability. Do not include any extra explanation or markdown fences ("\\\`\\\`\\\`"). Include only the final README content. Structure it with the following sections:
              - Project title with emojis  
              - Badges (placeholders for License, Maintenance, Contributors)  
              - Short catchy description  
              - Demo section with placeholders for result image and live link  
              - Features list with emojis  
              - Tech stack (frontend, backend, database, other tools)  
              - Getting started (clone repo, install deps, .env setup, run app)  
              - Contributing section  
              - License, Contact, Acknowledgment
              Project Details:  
              ${projectInput}`,
            },
          ],
        },
      ],
    });

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ readme: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate README." });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
