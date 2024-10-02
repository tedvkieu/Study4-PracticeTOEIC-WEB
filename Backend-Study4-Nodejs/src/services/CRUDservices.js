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
module.exports = {
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById,
};
