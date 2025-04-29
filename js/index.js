// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with your actual API key securely in production using environment variables
const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong while contacting OpenAI.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
