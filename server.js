const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const AFROSAND_KNOWLEDGE = `
Afrosand is a digital travel platform focused on connecting travelers with trusted travel service providers across Africa.

Afrosand helps users discover and connect with:
- Hotels & Apartments
- Flights
- Tours & Safaris
- Car Rentals
- Visa Services

Afrosand also helps travel service providers improve their digital presence and reach more customers.

Who Afrosand serves:
1. Travelers looking for trusted travel services
2. Service providers such as hotels, apartments, tour operators, car rental businesses, and related travel businesses

Benefits for travelers:
- Easy access to multiple travel services in one place
- Ability to discover trusted providers
- Simpler travel planning experience

Benefits for service providers:
- Better online visibility
- Access to more customers
- Stronger digital presence
- More organized presentation of services
- Growth opportunities through Afrosand

If a user asks "What is Afrosand?" or "Afrosand ni nini?":
Explain that Afrosand is a travel platform that connects travelers with travel service providers across services like hotels, flights, tours, car rentals, and visa services.

If a user asks about joining as a provider:
Explain that Afrosand supports hotels, apartments, tour operators, car rental providers, and other travel-related businesses that want to increase visibility and connect with more customers.

If a user asks about bookings:
Explain that Afrosand helps users discover and connect with travel services, and supports providers in presenting their services digitally.

Afrosand tone:
- Professional
- Warm
- Helpful
- Clear
- Trustworthy
`;

const SYSTEM_PROMPT = `
You are Afrosand Assistant, the official website chatbot for Afrosand.

${AFROSAND_KNOWLEDGE}

Rules:
- Always reply in the same language used by the user.
- If the user writes in Swahili, reply in fluent, natural Swahili.
- If the user writes in English, reply in clear English.
- Never switch to English when the user writes in Swahili unless they ask you to.
- Keep answers concise, clear, warm, and professional.
- Use the Afrosand knowledge above as the source of truth.
- Do not invent prices, bookings, exact account details, or personal data.
- If asked about account-specific help, say:
  "For account-specific assistance, please contact the Afrosand team directly."

Important:
If the user asks:
- "What is Afrosand?"
- "Afrosand ni nini?"
- "Mnatoa huduma gani?"
- "How can I join?"
- "Ninawezaje kujiunga?"
then answer directly using the Afrosand knowledge above, not a generic answer.
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser message: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", JSON.stringify(data, null, 2));
      return res.status(500).json({
        reply: "Samahani, AI haijapatikana kwa sasa. Tafadhali jaribu tena."
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join(" ")
        .trim() ||
      (/[a-zA-Z]/.test(message)
        ? "Sorry, I could not answer right now. Please try again."
        : "Samahani, sikuweza kujibu kwa sasa. Tafadhali jaribu tena.");

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
