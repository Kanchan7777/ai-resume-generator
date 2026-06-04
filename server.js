require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const apiKey = process.env.GEMINI_API_KEY;

app.post('/generate', async (req, res) => {
    const { resume, jobDescription } = req.body;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Write a professional cover letter based on this resume and job description.
                
Resume: ${resume}

Job Description: ${jobDescription}

Write a tailored, professional cover letter.`
                }]
            }]
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});