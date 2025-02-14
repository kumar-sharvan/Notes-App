// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Route to handle form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(
    `Received form data: Name: ${name}, Email: ${email}, Message: ${message}`
  );

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kumarsharvan844506@gmail.com",
      pass: "wqiv sdsk apvq efza",
    },
  });

  // Set up email options
  const mailOptions = {
    from: email,
    to: "kumarsharvan844506@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
    res.status(500).send("Server error");
  }
});

//MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();

//defining routes
app.use("/api/users", require("./routes/user"));
app.use("/api/notes", require("./routes/notes"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
