const Produit = require("../model/Produit.model");

// Contrôleur pour afficher tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};

// Contrôleur pour télécharger et ajouter un nouveau produit
exports.addProduit = async (req, res) => {
  try {
    const {
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
    } = req.body;

    // Vérifier si les champs requis sont fournis
    if (
      !titre ||
      !description ||
      !quantite ||
      !prix ||
      !Array.isArray(couleur) ||
      !Array.isArray(taille)
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    if (!req.body.images || !Array.isArray(req.body.images)) {
      return res.status(400).json({
        message:
          "Veuillez fournir les URLs des images pour la galerie de photos.",
      });
    }

    // Créer un nouveau produit avec les données fournies
    const produit = new Produit({
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
    });

    // Ajouter les URLs des images à la galerie
    for (const imageUrl of req.body.images) {
      produit.images.push({
        secure_url: imageUrl,
      });
    }

    // Enregistrer la galerie avec les images fournies
    await produit.save();

    res
      .status(201)
      .json({ message: "Le produit a été ajouté avec succès.", produit });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'ajout du produit." });
  }
};

// Contrôleur pour supprimer un produit par son ID
exports.deleteProduit = async (req, res) => {
  try {
    const produitId = req.params.id;

    // Vérifier si le produit existe avant de le supprimer
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Supprimer le produit
    await Produit.findByIdAndRemove(produitId);

    res.json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du produit.",
    });
  }
};

// Route pour récupérer un produit par son ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.produitId);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    res.json(produit);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit par ID :", error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du produit par ID.",
    });
  }
};

// Contrôleur pour mettre à jour un produit en fonction de son identifiant unique
exports.updateProduit = async (req, res) => {
  try {
    const produitId = req.params.id; // Récupérez l'identifiant du produit depuis les paramètres de la requête

    // Vérifiez si le produit existe avant de le mettre à jour
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Récupérez les données de mise à jour depuis le corps de la requête
    const {
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
      images, // Si vous souhaitez également mettre à jour les images, assurez-vous de les inclure dans le corps de la requête
    } = req.body;

    // Mettez à jour les propriétés du produit avec les nouvelles données
    produit.titre = titre || produit.titre;
    produit.description = description || produit.description;
    produit.couleur = couleur || produit.couleur;
    produit.quantite = quantite || produit.quantite;
    produit.prix = prix || produit.prix;
    produit.taille = taille || produit.taille;
    produit.categorie = categorie || produit.categorie;
    produit.marque = marque || produit.marque;
    produit.description_detaillee =
      description_detaillee || produit.description_detaillee;

    // Mettez à jour les images si elles sont fournies dans la requête
    if (images && Array.isArray(images)) {
      produit.images = images.map((image) => ({ secure_url: image }));
    }

    // Enregistrez les modifications apportées au produit
    await produit.save();

    res.json({ message: "Produit mis à jour avec succès.", produit });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du produit.",
    });
  }
};

// Contrôleur pour afficher tous les categorie
exports.getAllCategories = async (req, res) => {
  try {
    // Utilisez la méthode distinct de Mongoose pour récupérer toutes les catégories uniques
    const categories = await Produit.distinct("categorie");
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};
