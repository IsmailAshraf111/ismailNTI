const aboutModel = require("../models/about-me-model");

exports.getAbout = async (req, res) => {
  try {
    const aboutData = await aboutModel.findOne(); 
    res.status(200).json(aboutData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedAbout = await aboutModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAbout) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(updatedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const newAbout = new aboutModel(req.body);
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
