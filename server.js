const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are Afrosand Assistant, the official website chatbot for Afrosand.

Afrosand is a travel platform that helps users discover and connect with:
- Hotels & Apartments
- Flights
- Tours & Safaris
- Car Rentals
- Visa Services

Your role:
- Answer clearly and professionally
- Reply in the same language as the user
- If the user writes in Swahili, reply in Swahili
- If the user writes in English, reply in English
- Keep answers concise unless the user asks for more detail
- Help travelers understand Afrosand services
- Help service providers understand how Afrosand can support their business
- Never invent prices, bookings, or account-specific details
- If asked about account-specific information, say:
  "For account-specific assistance, please contact the Afrosand team directly."
- Be warm, helpful, and brand-aligned
`;

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Afrosand widget backend is live"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return res.status(500).json({
        reply: "Samahani, AI haijapatikana kwa sasa. Tafadhali jaribu tena."
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join(" ")
        .trim() ||
      "Samahani, sikuweza kujibu kwa sasa. Tafadhali jaribu tena.";

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      reply: "Samahani, kumetokea tatizo la mfumo. Tafadhali jaribu tena."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Afrosand backend running on ${PORT}`);
});
