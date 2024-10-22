const connection = require('../config/database');
const {
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById,
    handleGetList,
    handleGetAlistVoc,
    handleGetListAnswer,
    handleGetListLesson,
    handleChangeStatusStudy,
} = require('../services/CRUDservices');

const getHomePage = async (req, res) => {
    let rs = await getAllUsers();
    return res.render('home.ejs', { listUsers: rs });
};
const getHelloWorld = (req, res) => {
    //MySQL
    connection.query('select * from users u', function (err, results, fields) {
        users = results;
        console.log('>>>results = ', results);

        console.log('>>>check user = ', users);
        res.send(JSON.stringify(users));
    });
};

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    let [results, fields] = await connection.query(
        `INSERT into Users (email, name, city) values (?,?,?)`,
        [email, name, city]
    );
    console.log('check results = ', results);
    res.send('create user success');
};
const postUpdateUser = async (req, res) => {
    let userId = req.body.userId;
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    await updateUserById(userId, email, name, city);

    res.send('update user success');
};

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserByID(userId);
    res.render('delete.ejs', { user: user });
};

const getCreatePage = (req, res) => {
    res.render('create.ejs');
};

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserByID(userId);

    res.render('edit.ejs', { user: user });
};

const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect('/');
};

const getAllListVoc = async (req, res) => {
    let listVoc = await handleGetList();
    console.log('>>>check list Voc = ', listVoc);
    res.send(listVoc);
};

const getAListVocabulary = async (req, res) => {
    const { list_id } = req.query;
    let list = await handleGetAlistVoc(list_id);

    console.log('chekc list: ', list);

    res.send(list);
};

const getListPracticeAnswer = async (req, res) => {
    const id = req.query.vocabulary_id;
    console.log('chekc id1:', id);
    let list = await handleGetListAnswer(id);
    console.log('check result: ', list);

    res.send(list);
};

const getListLesson = async (req, res) => {
    const user = req.query.user_id;
    const listId = req.query.list_id;
    const lessonId = req.query.lesson_id;

    let lesson = await handleGetListLesson(user, listId, lessonId);

    res.send(lesson);
};


const putStatusLesson = async (req, res) => {
    const id = req.query.lesson_id;
    try {
        let rs = await handleChangeStatusStudy(id);

        return res.status(200).json({
            EC: 0,
            message: rs,
        });
    } catch (e) {
        return e;
    }
};

module.exports = {
    getHomePage,
    getHelloWorld,
    postCreateUser,
    postUpdateUser,
    postDeleteUser,
    getCreatePage,
    getUpdatePage,
    postHandleRemoveUser,
    getAllListVoc,
    getAListVocabulary,
    getListPracticeAnswer,
    getListLesson,
    putStatusLesson,
};
