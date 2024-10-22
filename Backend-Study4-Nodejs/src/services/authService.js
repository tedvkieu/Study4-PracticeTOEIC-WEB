const User = require('../models/User');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
const { setUpStateLearned } = require('../models/Lesson_ListVoc');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

const createUser = async (username, email, password, role) => {
    let hashPasswordFromBcrypt = await hashUserPassword(password);

    let emailValid = await validEmail(email);

    if (emailValid.EC === 0) {
        const sql =
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        let [user] = await connection.query(sql, [
            username,
            email,
            hashPasswordFromBcrypt,
            role,
        ]);

        try {
            await setUpStateLearned(user.insertId);
            return {
                EC: 0,
                EM: 'Regis Account Succeed',
                DT: user.insertId,
            };
        } catch (error) {
            return {
                EC: -1,
                EM: error,
                DT: null,
            };
        }
    } else {
        return emailValid;
    }
};

const validEmail = async (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra định dạng email
    if (!regex.test(email)) {
        // -1 mail khong dung format
        return { EC: -1, EM: 'Email is wrong format', DT: null };
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await connection.query(sql, [email]);

    if (results.length > 0) {
        return { EC: -1, EM: 'Email already exists', DT: null };
    }

    // Email hợp lệ và không tồn tại
    return { EC: 0 };
};

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

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync('B4c0//', salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
        // expiresIn: '7d',
        expiresIn: '15s',
    });
};

module.exports = { loginService, logoutService, createUser };
