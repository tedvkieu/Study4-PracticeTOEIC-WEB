require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || 'localhost';
const connection = require('./config/database');
const authController = require('./controllers/authController');
const apiRoute = require('./routes/apiRoute');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/', apiRoute);


// Định nghĩa route /hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
});


// Kết nối tới cơ sở dữ liệu và khởi động server
(async () => {
    try {
        // Query thử dữ liệu từ bảng Users
        connection.query('SELECT * FROM Users', (err, results, fields) => {
            if (err) throw err;
            console.log('>>> Users: ', results);
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Error connecting to DB or starting server:', error);
        e;
    }
})();
