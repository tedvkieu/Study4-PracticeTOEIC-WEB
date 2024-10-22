const express = require('express');
const router = express.Router();
const {
    handleLogin,
    handleLogout,
    handleRegister,
} = require('../controllers/authController');
const {
    getAllListVoc,
    getAListVocabulary,
    getListPracticeAnswer,
    getListLesson,
    getAListLesson,
    putStatusLesson,
} = require('../controllers/homeController');
const { getAllListUnit } = require('../controllers/lessonController');
const {
    getAllUser,
    createAUser,
    updateAUser,
    deleteAUser,
} = require('../controllers/userController');

const {
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI,
    getImage,
} = require('../controllers/apiController');

const unitController = require('../controllers/unitController');

// ----------------------------------------------Upload File

router.post('/api/file', postUploadSingleFileAPI);

router.post('/api/files', postUploadMultipleFileAPI);

router.get('/api/get-image/:filename', getImage);
// ---------------------------------------------

router.get('/api/get-all-list-voc', getAllListVoc);

router.get('/api/get-a-list-voc', getAListVocabulary);

router.get('/api/get-list-practice/answer-voc', getListPracticeAnswer);

router.get('/api/get-all-lesson', getListLesson);


router.put('/api/change-status-lesson', putStatusLesson);

// -------------------------- Unit  - Lesson

router.get('/api/unit/get-all-list-unit', getAllListUnit);

router.get('/api/unit/vocabulary', unitController.getAllListVocabulary);
router.post('/api/unit/vocabulary', unitController.createAVocabulary);
router.put('/api/unit/vocabulary', unitController.updateAVocabulary);
router.delete('/api/unit/vocabulary', unitController.deleteAVocabulary);

// --------------------------- Admin Management Participant---------------------
router.get('/api/user', getAllUser);
router.post('/api/user', createAUser);
router.put('/api/user', updateAUser);
router.delete('/api/user', deleteAUser);

// ------------------------------- Authorized ------------------------------------
router.post('/api/v1/login', handleLogin);
router.post('/api/v1/logout', handleLogout);
router.post('/api/v1/register', handleRegister);

module.exports = router;
