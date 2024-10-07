const connection = require('../config/database');
const {
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById,
    handleGetList,
    handleGetAListVoc,
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
    let list = await handleGetAListVoc(list_id);

    console.log("chekc list: ", list)

    res.send(list)
}

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
};
