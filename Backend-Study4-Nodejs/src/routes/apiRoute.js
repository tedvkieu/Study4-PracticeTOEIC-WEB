const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/authController');
const {
    getAllListVoc,
    getAListVocabulary,
    getListPracticeAnswer,
    getListLesson,
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
} = require('../controllers/apiController');

// ----------------------------------------------Upload File

router.post('/api/file', postUploadSingleFileAPI);

router.post('/api/files', postUploadMultipleFileAPI);

// ---------------------------------------------

router.post('/auth/login', authController.login);

router.get('/api/get-all-list-voc', getAllListVoc);

router.get('/api/get-a-list-voc', getAListVocabulary);

router.get('/api/get-list-practice/answer-voc', getListPracticeAnswer);

router.get('/api/get-all-lesson', getListLesson);

router.put('/api/change-status-lesson', putStatusLesson);

// -------------------------- Unit  - Lesson

router.get('/api/unit/get-all-list-unit', getAllListUnit);

// --------------------------- Admin Management Participant---------------------
router.get('/api/user', getAllUser);
router.post('/api/user', createAUser);
router.put('/api/user', updateAUser);
router.delete('/api/user', deleteAUser);

module.exports = router;
