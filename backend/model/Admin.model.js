const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String,required: true},
  // Autres champs pertinents
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
