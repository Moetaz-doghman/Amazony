const express = require("express");
const {
  createCommande,
  getCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
} = require("../controllers/commandeController");
const authAdmin = require("../middleware/authAdmin.js");
const router = express.Router();

// Créer une nouvelle commande
router.post("/commandes", createCommande);

// Obtenir la liste de toutes les commandes
router.get("/commandes", authAdmin, getCommandes);

// Obtenir une commande par son ID
router.get("/commandes/:id", authAdmin, getCommandeById);

// Mettre à jour une commande par son ID
router.put("/commandes/:id", authAdmin, updateCommande);

// Supprimer une commande par son ID
router.delete("/commandes/:id", authAdmin, deleteCommande);

module.exports = router;
