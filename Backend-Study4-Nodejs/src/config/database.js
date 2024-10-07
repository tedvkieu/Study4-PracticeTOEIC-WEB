require('dotenv').config();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Kiểm tra kết nối
connection
    .getConnection()
    .then((conn) => {
        console.log('Kết nối MySQL thành công!');
        conn.release(); // Đảm bảo trả lại kết nối sau khi kiểm tra
    })
    .catch((err) => {
        console.error('Kết nối MySQL thất bại:', err);
    });

module.exports = connection;
