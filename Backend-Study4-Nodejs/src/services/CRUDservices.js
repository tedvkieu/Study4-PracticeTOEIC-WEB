const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fields] = await connection.query('select * from Users');
    return results;
};

const getUserByID = async (userId) => {
    let [results, fields] = await connection.query(
        'select * from Users where id = ?',
        [userId]
    );
    let user = results && results.length > 0 ? results[0] : {};

    return user;
};

const updateUserById = async (userId, email, name, city) => {
    let [results, fields] = await connection.query(
        `UPDATE Users SET email = ?, name = ?, city = ? where id = ?`,
        [email, name, city, userId]
    );
};

const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        `delete from Users where id = ?`,
        [id]
    );
};

const handleGetList = async () => {
    let [results, fields] = await connection.query('select * from listvoc');

    console.log('check rs: ', results);

    return JSON.stringify(results);
};

const handleGetAListVoc = async (list_id) => {
    try {
        let [results, fields] = await connection.query(
            'SELECT f.*, l.* FROM flashcard f JOIN listvoc l ON f.list_id = l.list_id WHERE f.list_id = ?',
            [list_id] 
        );

        if (results.length === 0) {
            return {
                statusCode: 404,
                message: `Không tìm thấy danh sách từ vựng với list_id = ${list_id}.`,
            };
        }

        return {
            statusCode: 200,
            message: 'Lấy danh sách từ vựng thành công.',
            data: results,
        };
    } catch (error) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', error);
        return {
            statusCode: 500,
            message: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu.',
        };
    }
};

module.exports = {
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById,
    handleGetList,
    handleGetAListVoc,
};
