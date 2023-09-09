const express = require('express');
const { getAllGalleries, addGallery, deleteGallery } = require('../controllers/galleryController');
const authAdmin = require("../middleware/authAdmin.js");
const router = express.Router();

router.get('/getAllGalleries', getAllGalleries);
router.post('/addGallery',authAdmin , addGallery);
router.delete('/deleteGallery/:id', authAdmin , deleteGallery)



module.exports = router;
