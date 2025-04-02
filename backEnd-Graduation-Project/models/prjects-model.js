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
    default: "",
  },
  btnTwoTitle: {
    type: String,
    default: "",
  },

  btnOneURL: {
    type: String,
    default: "",
  },
  btnTwoURL: {
    type: String,
    default: "",
  },

  imgUrl: {
    type: String,
    default: "",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
