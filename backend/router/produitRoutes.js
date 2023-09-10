const express = require("express");
const authAdmin = require("../middleware/authAdmin.js");
const { addProduit, getAllProduits, deleteProduit, getProduitById, updateProduit, getAllCategories, getAllProduit, getAllCategorie } = require("../controllers/produitController.js");
const router = express.Router();

router.post("/addProduit", authAdmin, addProduit);
router.delete("/deleteProduit/:id", authAdmin, deleteProduit);
router.get("/getAllProduits", authAdmin, getAllProduits);
router.get("/getAllProduit", getAllProduit);
router.get("/getProduitById/:produitId", authAdmin, getProduitById);
router.get("/getProduitsById/:produitId",  getProduitById);
router.put("/updateProduit/:id", authAdmin, updateProduit);
router.get("/getAllCategories", authAdmin ,getAllCategories);
router.get("/getAllCategorie" ,getAllCategorie);




module.exports = router;
