// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();


// Đăng ký
router.post('/register', async (req, res) => {
    const { fullname, phone, email, username, password } = req.body;
    console.log("Received registration data:", req.body); // Kiểm tra dữ liệu được gửi lên
  
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({
        fullname,
        phone,
        email,
        username,
        password: hashedPassword
      });
      await newUser.save();

      console.log("User successfully registered:", newUser); // Kiểm tra thông tin người dùng đã lưu
      res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });
    } catch (error) {
      console.error("Error during registration:", error); // In lỗi ra console
      return res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    console.log("Login attempt with:", req.body); // Kiểm tra dữ liệu đăng nhập

    try {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
      });
      if (!user) {
        return res.status(400).json({ message: 'Sai tên đăng nhập/email hoặc mật khẩu!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Sai tên đăng nhập/email hoặc mật khẩu!' });
      }

      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      console.log("User successfully logged in:", user); // Kiểm tra người dùng đăng nhập
      res.json({ token, message: 'Đăng nhập thành công!', user: user });
    } catch (error) {
      console.error("Error during login:", error); // In lỗi ra console
      res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
});

  

module.exports = router;