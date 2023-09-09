const Gallery = require('../model/Gallery.model');

// Contrôleur pour afficher toutes les galeries de photos
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    console.error('Erreur lors de la récupération des galeries :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des galeries.' });
  }
};

// Contrôleur pour télécharger et ajouter une nouvelle galerie de photos
exports.addGallery = async (req, res) => {
  try {
    // Vérifier si une galerie de photos a été envoyée avec un titre et des images
    if (!req.body.title) {
      return res.status(400).json({ message: 'Veuillez fournir un titre pour la galerie de photos.' });
    }

    if (!req.body.images || !Array.isArray(req.body.images)) {
      return res.status(400).json({ message: 'Veuillez fournir les URLs des images pour la galerie de photos.' });
    }

    // Créer une nouvelle galerie avec le titre fourni
    const gallery = new Gallery({ title: req.body.title });

    // Ajouter les URLs des images à la galerie
    for (const imageUrl of req.body.images) {
      gallery.images.push({
        secure_url: imageUrl,
      });
    }

    // Enregistrer la galerie avec les images fournies
    await gallery.save();

    res.status(201).json({ message: 'La galerie de photos a été créée avec les images fournies.', gallery });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la galerie de photos :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la galerie de photos.' });
  }
};

// Contrôleur pour supprimer une galerie de photos en fonction de son identifiant unique
exports.deleteGallery = async (req, res) => {
  try {
    const galleryId = req.params.id;

    // Vérifier si la galerie existe avant de la supprimer
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      return res.status(404).json({ message: 'Galerie non trouvée.' });
    }

    // Supprimer la galerie
    await Gallery.findByIdAndRemove(galleryId);

    res.json({ message: 'Galerie supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la galerie :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la galerie.' });
  }
};
