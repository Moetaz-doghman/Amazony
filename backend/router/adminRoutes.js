const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authAdmin = require("../middleware/authAdmin.js");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// Protected route that requires authentication
router.get("/protected", authAdmin, (req, res) => {
  return res
    .status(200)
    .json({ message: "Protected route accessible only with a valid token." });
});

// Routes pour admin

//USERS routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/logout", authAdmin);

router.get("/check", authAdmin, (req, res) => {
  // Si le middleware `authAdmin` a été exécuté avec succès, cela signifie que le jeton est valide et l'authentification est réussie.
  // Vous pouvez renvoyer les informations d'authentification associées au jeton si nécessaire.
  res.status(200).json({ isAuthenticated: true, user: req.adminId }); // Exemple de réponse avec l'état d'authentification et l'ID de l'administrateur
});

module.exports = router;
