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

router.post('/auth/login', authController.login);

router.get('/api/get-all-list-voc', getAllListVoc);

router.get('/api/get-a-list-voc', getAListVocabulary);

router.get('/api/get-list-practice/answer-voc', getListPracticeAnswer);

router.get('/api/get-all-lesson', getListLesson);

router.put('/api/change-status-lesson', putStatusLesson);


// -------------------------- Unit  - Lesson

router.get('/api/unit/get-all-list-unit', getAllListUnit);

module.exports = router;
