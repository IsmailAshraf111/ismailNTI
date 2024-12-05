const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  description: { type: String, required: true },
  titleBox: { type: String, required: true },
  iconOne: { type: String, required: true },
  descIconOne: { type: String, required: true },
  iconTwo: { type: String, required: true },
  descIconTwo: { type: String, required: true },
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
