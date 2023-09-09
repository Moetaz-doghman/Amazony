const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  secure_url: {
    type: String,
    required: true,
  },
});

const ProduitSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   description_detaillee: {
      type: String,
    },
    couleur: [
      {
        type: String,
      },
    ],
    quantite: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    taille: [
      {
        type: String,
      },
    ],
    categorie: {
      type: String,
    },
    marque: {
      type: String,
    },
    images: [ImageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Produit", ProduitSchema);
