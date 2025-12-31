const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./db");
const Form = require("./models/Form");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// API
app.post("/submit-form", upload.single("resume"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const formData = new Form({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      selectedOption: req.body.selectedOption,
      subjects: req.body.subjects ? JSON.parse(req.body.subjects) : {},
      resume: req.file ? req.file.filename : null,
      url: req.body.url,
      about: req.body.about,
    });

    await formData.save();

    res.status(201).json({
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
