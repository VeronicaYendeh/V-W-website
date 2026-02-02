const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS — SINGLE SOURCE OF TRUTH
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bejeweled-fox-af76f6.netlify.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Body parser
app.use(express.json({ limit: "10mb" }));

// =======================
// EMAIL ENDPOINT
// =======================
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
      text: `Message:\n${message}\n\nScore: ${score ?? ""}`,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ error: "Email failed" });
  }
});

// =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
