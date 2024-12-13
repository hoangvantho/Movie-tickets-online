const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Thiết lập nơi lưu trữ và tên file cho hình ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Sử dụng tên file gốc
    }
});

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Lấy danh sách tất cả combo
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection('combo');
        const combos = await collection.find({}).toArray();
        res.json(combos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Lấy thông tin combo theo id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('combo');
        const combo = await collection.findOne({ _id: new ObjectId(id) });

        if (!combo) {
            return res.status(404).json({ message: 'Không tìm thấy combo' });
        }
        res.json(combo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});


// Thêm combo mới
router.post('/add', upload.single('Anh'), async (req, res) => {
    try {
        const { TenCombo, NoiDung, Gia } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Ảnh là bắt buộc' });
        }

        const db = await connectDb();
        const collection = db.collection('combo');

        const Anh = `/images/${req.file.filename}`;

        // Tạo ID mới bằng cách đếm số tài liệu hiện tại
        const newId = (await collection.countDocuments()) + 1;

        const newCombo = {
            id: newId,
            TenCombo,
            NoiDung,
            Gia,
            Anh: req.file ? Anh : "/images/combo/default.jpg", // Sử dụng ảnh upload nếu có, ảnh mặc định nếu không
        };

        await collection.insertOne(newCombo);
        res.status(201).json({ message: 'Combo đã được thêm thành công', combo: newCombo });
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm combo:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm combo', error: error.message });
    }
});


// Sửa thông tin combo
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
    try {
        const { id } = req.params;
        const { TenCombo, NoiDung, Gia } = req.body;
        const db = await connectDb();
        const collection = db.collection('combo');

        const updatedCombo = {
            TenCombo,
            NoiDung,
            Gia,
            Anh: req.file ? `/images/${req.file.filename}` : null // Giữ ảnh cũ nếu không có ảnh mới
        };

        // Lấy thông tin combo hiện tại để xóa ảnh cũ nếu có
        const currentCombo = await collection.findOne({ _id: new ObjectId(id) });

        if (req.file) {
            updatedCombo.Anh = `/images/${req.file.filename}`; // Lưu tên file ảnh mới

            // Xóa ảnh cũ nếu có
            if (currentCombo.Anh) {
                const oldImagePath = path.join(__dirname, '../public/images/', currentCombo.Anh.split('/').pop());
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Có lỗi xảy ra khi xóa ảnh cũ:', err);
                    }
                });
            }
        } else {
            updatedCombo.Anh = currentCombo.Anh; // Giữ nguyên ảnh cũ nếu không upload ảnh mới
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedCombo });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy combo để cập nhật' });
        } else {
            res.json({ message: 'Cập nhật combo thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Xóa combo
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('combo');

        const comboToDelete = await collection.findOne({ _id: new ObjectId(id) });
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy combo để xóa' });
        } else {
            // Xóa ảnh nếu có
            if (comboToDelete.Anh) {
                const imagePath = path.join(__dirname, '../public/images/', comboToDelete.Anh.split('/').pop());
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Có lỗi xảy ra khi xóa ảnh:', err);
                    }
                });
            }
            res.json({ message: 'Combo đã được xóa thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

module.exports = router;
