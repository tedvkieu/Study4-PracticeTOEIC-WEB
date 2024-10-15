const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require('../services/fileService');

const postUploadSingleFileAPI = async (req, res) => {
    console.log('chekc files: ', req.file);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded');
    }
    let result = await uploadSingleFile(req.files.image);

    return res.status(200).json({
        EC: 0,
        data: result,
    });
};

const postUploadMultipleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded');
    }

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result,
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};

module.exports = { postUploadSingleFileAPI, postUploadMultipleFileAPI };
