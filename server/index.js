const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists?:", !!process.env.EMAIL_PASS);

/* =======================
   CORS (CORRECT – SINGLE SOURCE)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://bejeweled-fox-af76f6.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman / server-to-server
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "10mb" }));

/* =======================
   EMAIL ENDPOINT
======================= */
app.post("/send-email", async (req, res) => {
  try {
    const { message, score, drawings = [] } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const attachments = drawings.map((image, index) => ({
      filename: `drawing_${index + 1}.png`,
      content: image.split(";base64,")[1],
      encoding: "base64",
    }));

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Drawings and letter for you 💌",
      text: `Message:\n${message}\n\nScore:\n${score ?? ""}`,
      attachments,
    });

    console.log("✅ Email sent successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    res.status(500).json({ message: "Email failed", error: error.message });
  }
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
