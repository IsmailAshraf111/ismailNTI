const Contact = require("../models/contact-me-model");

exports.getContact = async (req, res) => {
  try {
    const contactData = await Contact.findOne(); 
    res.status(200).json(contactData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contactData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







