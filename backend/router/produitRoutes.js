const express = require("express");
const authAdmin = require("../middleware/authAdmin.js");
const { addProduit, getAllProduits, deleteProduit, getProduitById, updateProduit, getAllCategories, getAllProduit, getAllCategorie, mostRated, getAllProduitByRating, getAllProduitByDate, getProduitsByCategories, getProduitsByPrice, search } = require("../controllers/produitController.js");
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
router.post("/mostRated" ,mostRated);
router.get("/getAllProduitByRating" ,getAllProduitByRating);
router.get("/getAllProduitByDate" ,getAllProduitByDate);
router.get("/getProduitsByCategories/:categories" ,getProduitsByCategories);
router.get("/getProduitsByPrice" ,getProduitsByPrice);
router.get("/search" ,search);






module.exports = router;
