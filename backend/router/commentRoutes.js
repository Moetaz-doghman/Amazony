const express = require("express");
const { createComment, getAllComments, updateComment, deleteComment } = require("../controllers/commentController");
const router = express.Router();

// Créer un commentaire
router.post("/comments", createComment);

// Récupérer tous les commentaires
router.get("/comments", getAllComments);

// Mettre à jour un commentaire
router.put("/comments/:commentId", updateComment);

// Supprimer un commentaire
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
