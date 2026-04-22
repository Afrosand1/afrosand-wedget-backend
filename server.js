const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Afrosand Backend Live 🚀");
});

app.post("/chat", (req, res) => {
  const message = req.body.message || "";

  res.json({
    reply: "Karibu Afrosand 👋 Umesema: " + message
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
