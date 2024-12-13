const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');

// Lấy danh sách hóa đơn
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection('hoadon'); // Đảm bảo tên collection trong DB là 'hoadon'
        
        const bills = await collection.find().toArray(); // Lấy tất cả các hóa đơn
        
        res.json(bills); // Trả về danh sách hóa đơn dưới dạng JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

module.exports = router;
