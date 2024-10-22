const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginService = async (email, password) => {
    // Gọi hàm findByEmail để tìm người dùng theo email
    let user = await User.findByEmail(email);

    if (user) {
        if (user.password !== password) {
            return 'Invalid password';
        }

        // Tạo token
        const access_token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '5s' }
        );

        const refresh_token = generateRefreshToken(user.id);
        await User.updateRefreshToken(user.id, refresh_token);

        let data = {
            access_token,
            refresh_token,
            user_id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            image: user.image,
        };
        return data;
    } else {
        return 'User not found';
    }
};

const logoutService = async (email, refresh_token) => {
    const user = await User.findByEmail(email);
    if (!user) {
        return { EC: 1, EM: 'User not found' };
    }

    // Kiểm tra refresh_token có khớp không
    if (user.refresh_token !== refresh_token) {
        return { EC: 1, EM: 'Invalid refresh token' };
    }

    await User.updateRefreshToken(user.id, null);

    const expiredTime = new Date();
    await User.updateRefreshExpired(user.id, expiredTime);
    return {
        EC: 0,
        EM: 'LogOut succeeded',
        DT: {
            email: user.email,
            refresh_token: user.refresh_token,
        },
    };
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
        // expiresIn: '7d',
        expiresIn: '15s',
    });
};

module.exports = { loginService, logoutService };
