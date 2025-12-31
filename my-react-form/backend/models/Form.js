const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    gender: String,
    selectedOption: String,
    subjects: Object,
    resume: String,
    url: String,
    about: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
