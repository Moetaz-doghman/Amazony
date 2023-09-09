// models/Gallery.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  secure_url: {
    type: String,
    required: true,
  },
});

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', GallerySchema);