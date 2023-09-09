const express = require("express");
const authAdmin = require("../middleware/authAdmin.js");
const { addProduit, getAllProduits, deleteProduit, getProduitById, updateProduit } = require("../controllers/produitController.js");
const router = express.Router();

router.post("/addProduit", authAdmin, addProduit);
router.delete("/deleteProduit/:id", authAdmin, deleteProduit);
router.get("/getAllProduits", authAdmin, getAllProduits);
router.get("/getProduitById/:produitId", authAdmin, getProduitById);
router.put("/updateProduit/:id", authAdmin, updateProduit);



module.exports = router;
