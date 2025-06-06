import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI();

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ],
    });

    const botReply = response.choices[0].message.content;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Something went wrong with OpenAI API" });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Digital Literacy Chatbot API!');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
