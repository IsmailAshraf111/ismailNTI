const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  description: { type: String, required: true },
  boxTitle: { type: String, required: true },


  // iconOneLink: { type: String, required: true },
  // iconOneName: { type: String, required: true },
  // iconOne: { type: String, required: true },
  // IconTwoLink: { type: String, required: true },
  // IconTwoName: { type: String, required: true },
  // iconTwo: { type: String, required: true },

  
  phoneNumber: { type: Number,  required: true },
  // communication: [
  //   { link: { type: String, required: true } },
  //   { name: { type: String, required: true } },
  //   { icon: { type: String, required: true } },
  // ]
  communication: [
    {
      type: new mongoose.Schema(
        {
          link: { type: String, required: true },
          name: { type: String, required: true },
          icon: { type: String, required: true }
        },
        { _id: false }
      )
    }
  ]
  
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
