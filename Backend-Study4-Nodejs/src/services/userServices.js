const connection = require('../config/database');

const getAllUserService = async () => {
    try {
        let [result] = await connection.query('select * from users');

        console.log('check data: ', result);
        if (result === null) {
            return 'Do not find any user';
        } else {
            return result;
        }
    } catch (e) {
        return 'Failed to find user';
    }
};
const createAUserService = async (data) => {
    try {
        const sql =
            'INSERT INTO users (email, password, username, role, image) VALUES (?, ?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        let [result, fields] = await connection.query(sql, [
            data.email,
            data.password,
            data.username,
            data.role,
            data.image,
        ]);
        const insertedId = result.insertId;

        const [rows, fields2] = await connection.query(
            'SELECT * FROM users WHERE id = ?',
            [insertedId]
        );

        console.log('res: ', rows);

        return rows;
    } catch (e) {
        return 'Failed to insert user';
    }
};

const updateAUserService = async (data) => {
    try {
        const sql = `
            UPDATE users 
            SET email = ?, password = ?, username = ?, role = ?, image = ? 
            WHERE id = ?
        `;

        // Thực hiện câu lệnh SQL
        await connection.query(sql, [
            data.email,
            data.password,
            data.username,
            data.role,
            data.image,
            data.id,
        ]);
        const [rows, fields] = await connection.query(
            'SELECT * FROM users WHERE id = ?',
            [data.id]
        );

        return rows;
    } catch (e) {
        return 'Failed to update user';
    }
};

const deleteAUserService = async (id) => {
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        let [result, fields] = await connection.query(sql, [id]);
        if (result.affectedRows === 0) {
            return 'No user found to delete';
        }

        return 'User deleted successfully';
    } catch (e) {
        return 'Failed to delete user';
    }
};

module.exports = {
    getAllUserService,
    createAUserService,
    updateAUserService,
    deleteAUserService,
};
