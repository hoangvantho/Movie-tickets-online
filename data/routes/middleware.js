// middleware.js
const jwt = require('jsonwebtoken');
const connectDb = require('../models/db');

const getUserFromToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        const db = await connectDb();
        const userCollection = db.collection('taikhoan');
        const userInfo = await userCollection.findOne({ Email: user.Email });

        if (!userInfo) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        req.user = userInfo; // Lưu thông tin người dùng vào req
        next(); // Chuyển tiếp đến route tiếp theo
    });
};

module.exports = { getUserFromToken };