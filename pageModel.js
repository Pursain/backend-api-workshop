const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  links: [String]
});

const pageModel = mongoose.model('page', pageSchema);

module.exports = pageModel;
