const express = require('express');
const router = express.Router();
const {
    getHomePage,
    getHelloWorld,
    postCreateUser,
    postUpdateUser,
    postDeleteUser,
    getCreatePage,
    getUpdatePage,
    postHandleRemoveUser,
} = require('../controllers/homeController');

router.get('/', getHomePage);

router.get('/home', getHelloWorld);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage);

router.post('/create_user', postCreateUser);

router.post('/update_user', postUpdateUser);

router.post('/delete_user/:id', postDeleteUser);
router.post('/delete_user/', postHandleRemoveUser);

router.get('/hello', (req, res) => {
    res.send('hello world');
});

module.exports = router;
