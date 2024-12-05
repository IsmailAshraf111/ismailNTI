const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  tech: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  btnOneTitle: {
    type: String,
    required: true,
  },
  btnTwoTitle: {
    type: String,
    required: true,
  },

  btnOneURL: {
    type: String,
    required: true,
  },
  btnTwoURL: {
    type: String,
    required: true,
  },

  imgUrl: {
    type: String,
    default: "",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
