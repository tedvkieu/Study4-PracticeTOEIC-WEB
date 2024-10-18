const { uploadSingleFile } = require('../services/fileService');
const userServices = require('../services/userServices');

const getAllUser = async (req, res) => {
    let result = await userServices.getAllUserService();
    console.log('check data: ', result);
    return res.status(200).json({
        EC: 0,
        data: result,
    });
};

const createAUser = async (req, res) => {
    let { email, password, username, role } = req.body;

    let imageUrl = '';
    if (!req.files || Object.keys(req.files).length === 0) {
        // do nothing
    } else {
        let result = await uploadSingleFile(req.files.image);
        console.log(' check res :', result.path);
        imageUrl = result.path;
    }

    let data = {
        email: email,
        password: password,
        username: username,
        role: role,
        image: imageUrl,
    };

    let result = await userServices.createAUserService(data);
    console.log('check data: ', result);
    return res.status(200).json({
        EC: 0,
        data: result,
    });
};

const updateAUser = async (req, res) => {
    let { id, email, password, username, role } = req.body;

    let imageUrl = '';
    console.log('check fileeeeeeeeeeeeeee: ', req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        // do nothing
    } else {
        let result = await uploadSingleFile(req.files.image);
        console.log(' check res :', result.path);
        imageUrl = result.path;
    }

    let data = {
        id: id,
        email: email,
        password: password,
        username: username,
        role: role,
        image: imageUrl,
    };

    let result = await userServices.updateAUserService(data);
    console.log('check data: ', result);
    return res.status(200).json({
        EC: 0,
        data: result,
    });
};

const deleteAUser = async (req, res) => {
    let id = req.body.id;

    let result = await userServices.deleteAUserService(id);
    console.log('check data: ', result);
    return res.status(200).json({
        EC: 0,
        data: result,
    });
};
module.exports = { createAUser, updateAUser, deleteAUser, getAllUser };
