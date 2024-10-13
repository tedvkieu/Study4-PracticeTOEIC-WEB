const connection = require('../config/database');
const { handleGetAllUnit } = require('../services/lessonService');

const getAllListUnit = async (req, res) => {
    try {
        let result = await handleGetAllUnit();

        return res.status(200).json({
            EC: 0,
            message: 'get success',
            data: result,
        });
    } catch (e) {
        return e;
    }
};

module.exports = {
    getAllListUnit,
};
