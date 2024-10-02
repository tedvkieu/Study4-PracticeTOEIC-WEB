const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;

        User.findByEmail(email, (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ EC: 1, EM: 'Database query error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ EC: 1, EM: 'User not found' });
            }

            const user = results[0];

            // Kiểm tra mật khẩu
            if (user.password !== password) {
                return res.status(401).json({ EC: 1, EM: 'Invalid password' });
            }

            // Tạo token
            const access_token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.SECRET_KEY,
                { expiresIn: '15m' }
            );

            const refresh_token = generateRefreshToken(user.id);

            return res.json({
                DT: {
                    access_token,
                    refresh_token,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                    image: user.image,
                },
                EC: 0,
                EM: 'Login succeed',
            });
        });
    },
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });
};

module.exports = { authController };
