const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists?:", !!process.env.EMAIL_PASS);

const app = express();
const PORT = process.env.PORT || 3000;

/* =======================
   CORS CONFIG (FINAL FIX)
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://bejeweled-fox-af76f6.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
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

    // Verify transporter (helps debugging on Render)
    await transporter.verify();

    const attachments = drawings.map((image, index) => ({
      filename: `drawing_${index + 1}.png`,
      content: image.split(";base64,")[1],
      encoding: "base64",
    }));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Drawings and letter for you 💌",
      text: `Message:\n${message}\n\nScore:\n${score ?? ""}`,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    return res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
