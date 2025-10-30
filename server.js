const express = require("express");
const fetch = require("node-fetch"); // نصب: npm install node-fetch@2
const cors = require("cors");
const app = express();

app.use(cors()); // اجازه دسترسی از هر جا
app.use(express.json());

const BOT_TOKEN = "8232845056:AAF5zBkEUz0BaviGKh7sbYUDK9bFvQXiAuIا"; 
const CHAT_ID = "222711688"; 

app.post("/send-order", async (req, res) => {
  const { name, site, details } = req.body;

  const message = `🖥 سفارش جدید طراحی سایت:\n\n👤 نام: ${name}\n🌐 نام سایت: ${site}\n📝 توضیحات:\n${details}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });

    if (response.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
