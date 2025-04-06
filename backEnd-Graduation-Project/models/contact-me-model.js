const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  headerContact: { type: String, required: true },
  description: { type: String, required: true },
  titleBox: { type: String, required: true },
  descriptionBox: { type: String, required: true },
  linkIconOne: { type: String, required: true },
  descIconOne: { type: String, required: true },
  iconeOne: { type: String, required: true },
  linkIconTwo: { type: String, required: true },
  descIconTwo: { type: String, required: true },
  iconeTwo: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;











// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//   description: String,
//   titlePox: String,
//   iconeOne: String,
//   DscrIconeOne: String,
//   iconTwo: String,
//   descIconeTwo: String,
// });

// // create model

// const contact = mongoose.model("about", aboutSchema);

// module.exports = contact;
