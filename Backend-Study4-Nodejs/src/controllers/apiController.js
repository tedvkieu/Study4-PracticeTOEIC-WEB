const path = require('path');
const fs = require('fs');
const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require('../services/fileService');

const getImage = (req, res) => {
    const filename = req.params.filename; // Get the filename from the request
    console.log('check file: ', filename);
    const imagePath = path.join(__dirname, '../public/images/upload', filename); // Đường dẫn tới tệp hình ảnh

    // Kiểm tra xem tệp có tồn tại không
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Image not found'); // Nếu không tồn tại, trả về 404
        }

        // Nếu tồn tại, gửi tệp hình ảnh trực tiếp
        res.sendFile(imagePath);
    });
};

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

module.exports = {
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI,
    getImage,
};
