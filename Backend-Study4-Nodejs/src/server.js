require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || 'localhost';
const connection = require('./config/database');
const path = require('path');
const apiRoute = require('./routes/apiRoute');

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('check dirname: ', __dirname);
app.use(
    '/images',
    express.static(path.join(__dirname, 'public/images/upload'))
);

// Route
app.use('/', apiRoute);

// Định nghĩa route /hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// Kết nối tới cơ sở dữ liệu và khởi động server
(async () => {
    try {
        // Kiểm tra kết nối cơ sở dữ liệu trước khi truy vấn
        const poolConnection = await connection.getConnection();
        console.log('Đã kết nối tới cơ sở dữ liệu!');

        // Truy vấn dữ liệu từ bảng Users
        const [results] = await poolConnection.query('SELECT * FROM Users');

        poolConnection.release(); // Trả lại kết nối cho pool

        // Khởi động server sau khi kết nối thành công
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error connecting to DB or starting server:', error);
    }
})();
