const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/authController');
const {
    getAllListVoc,
    getAListVocabulary,
} = require('../controllers/homeController');

router.post('/auth/login', authController.login);

router.get('/api/get-all-list-voc', getAllListVoc);

router.get('/api/get-a-list-voc', getAListVocabulary);

module.exports = router;
