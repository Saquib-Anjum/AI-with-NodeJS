import express from 'express';
import axios from 'axios';

const portfolio = async (req, res) => {
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    try {
        const {
            name,
            title,
            bio,
            skills,
            email,
            github,
            linkedin
        } = req.body;

        const prompt = `
Generate a complete modern personal portfolio in a single HTML file.

User Information:
Name: ${name}
Title: ${title}
Bio: ${bio}
Skills: ${skills}
Email: ${email}
GitHub: ${github}
LinkedIn: ${linkedin}

Requirements:
- Use only HTML, CSS, and plain JavaScript (optional).
- Do not use external frameworks like Bootstrap or TailwindCSS.
- Embed CSS inside <style> and JS inside <script> within the same file.
- Use proper semantic HTML5 structure (header, main, footer, etc).
- Add a modern, clean layout.
- Optimize for SEO (include <meta> tags, alt text for images, etc).
- Include the user's name in <title>.
- Include a good default profile image using an open-source realistic avatar (if none is provided).
- Display sections: About Me, Skills (bulleted list), and Contact (email + social links).
- Make it responsive and visually appealing.
- Return only the HTML code (no explanations).
        `;

        const response = await axios.post(GEMINI_API_URL, {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        });

        const result = response.data.candidates[0].content.parts[0].text;

        res.status(200).json({ portfolio: result });

    } catch (err) {
        console.error('Portfolio Generation Error:', err.message);
        res.status(500).json({ error: 'Failed to generate portfolio.' });
    }
};

export { portfolio };
