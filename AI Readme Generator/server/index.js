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
              text: `Generate a professional and well-formatted README.md file for the following project: ${projectInput}`,
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
