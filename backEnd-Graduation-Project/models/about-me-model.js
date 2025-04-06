const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  description: { type: String },
  languages: { type: String, required: true },
  databases: { type: String, required: true },
  otherSkills: { type: String, required: false },
  tools: { type: String, required: false },
  frameworks: { type: String, required: false },
});


const About = mongoose.model("About", aboutSchema);

module.exports = About;












// const mongoose = require("mongoose");

// const aboutSchema = new mongoose.Schema({

//   description: String,
//   img: String,
//   languages: String,
//   databases: String,
//   otherSkills:String,
//   tools:String,
//   frameworks:String,
// });

// // create model

// const about = mongoose.model("about", aboutSchema);

// module.exports = about;
