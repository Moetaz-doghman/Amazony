const Admin = require("../model/Admin.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const secretKey = ENV.JWT_SECRET;

exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier si l'administrateur existe déjà
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Cet administrateur existe déjà." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel administrateur
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      // Autres champs pertinents
    });

    // Sauvegarder l'administrateur dans la base de données
    await newAdmin.save();

    return res
      .status(201)
      .json({ message: "L'administrateur a été créé avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de l'administrateur.",
    });
  }
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin corresponding to the username
    const admin = await Admin.findOne({ username });
    let user; // Variable to store the authenticated user

    if (admin) {
      // Verify the password for admin
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        user = admin;
      }
    }

    // Create the authentication token with user-related payload
    const userTokenPayload = {
      userId: user._id,
      role: "admin",
      username: user.isAdmin ? user.username : user.login, // Use 'username' for admin, 'login' for teacher
      // Add more user-related data if needed
    };

    const token = jwt.sign(userTokenPayload, secretKey, { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'authentification." });
  }
};
