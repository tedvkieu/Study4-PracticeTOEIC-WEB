const {
    loginService,
    logoutService,
    createUser,
} = require('../services/authService');

const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;
    const role = 'USER';
    try {
        const newUser = await createUser(username, email, password, role);
        console.log('check new user: ', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({
            EC: 1,
            EM: 'Error creating user: ' + error.message,
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Gọi hàm loginService để thực hiện đăng nhập
        let result = await loginService(email, password);

        // Kiểm tra kết quả trả về từ loginService
        if (result === 'Invalid password') {
            return res.status(401).json({
                EC: 1, // Error Code
                EM: 'Invalid password', // Error Message
            });
        } else if (result === 'User not found') {
            return res.status(404).json({
                EC: 1,
                EM: 'User not found',
            });
        } else {
            // Trả về thông tin người dùng và token
            return res.status(200).json({
                EC: 0, // Success Code
                EM: 'Login succeed', // Success Message
                DT: result, // Data
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            EC: 1,
            EM: 'Internal server error',
        });
    }
};

const handleLogout = async (req, res) => {
    const { email, refresh_token } = req.body;

    try {
        // Gọi service để xử lý logout
        const result = await logoutService(email, refresh_token);

        // Trả về kết quả từ service
        return res.status(result.EC === 0 ? 200 : 400).json(result);
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({
            EC: 1,
            EM: 'Internal server error',
        });
    }
};

module.exports = { handleLogin, handleLogout, handleRegister };
