// home-model.js
const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, default: 'default-image.jpg' }, 
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
