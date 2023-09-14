const Comment = require('../model/Comment.model');

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { itemId, comment, rating } = req.body;
    const newComment = new Comment({ itemId, comment, rating });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Erreur lors de la création du commentaire :', error);
    res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
  }
};

// Récupérer tous les commentaires
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  const { itemId, comment, rating } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { itemId, comment, rating },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du commentaire' });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndRemove(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }
    res.status(204).send(); // Réponse avec succès, pas de contenu
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
};
