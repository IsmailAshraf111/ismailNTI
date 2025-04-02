// home-controller.js
const Home = require('../models/home-model');
const path = require('path');

exports.getHomeData = async (req, res) => {
  try {
    const homeData = await Home.findOne();
    if (!homeData) return res.status(404).json({ message: 'No data found' });
    res.status(200).json(homeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMetaData = async (req, res) => {
  try {
    const updateData = req.body;
    const id = req.params.id;

    if (req.file) {
      updateData.img = `uploads/${req.file.filename}`; 
    }

    const updatedHome = await Home.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedHome) return res.status(404).json({ message: 'Home data not found' });
    res.status(200).json(updatedHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.createMetaData = async (req, res) => {
//   try {
//     // const newHome = new Home(req.body);
//     const newHomeData = req.body;

//     if (req.file) {
//       newHomeData.img = `uploads/${req.file.filename}`;
//     }
//     const newHome = new Home(newHomeData);
//     const savedHome = await newHome.save();
//     res.status(201).json(savedHome);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

