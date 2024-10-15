// models/User.js

const connection = require('../config/database'); // Giả sử bạn đã kết nối cơ sở dữ liệu

const findByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.query(query, [email]);

    if (rows.length > 0) {
        return rows[0]; // Trả về người dùng tìm thấy
    } else {
        return null; // Không tìm thấy người dùng
    }
};

const updateRefreshToken = async (userId, refreshToken) => {
    const query = 'UPDATE users SET refresh_token = ? WHERE id = ?';
    await connection.query(query, [refreshToken, userId]);
};

const updateRefreshExpired = async (userId, expiredTime) => {
    const query = 'UPDATE users SET refresh_expired = ? WHERE id = ?';
    await connection.query(query, [expiredTime, userId]);
};
module.exports = { findByEmail, updateRefreshToken, updateRefreshExpired };
