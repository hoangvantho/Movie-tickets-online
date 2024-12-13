// employees.js (phía admin)
const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Thiết lập nơi lưu trữ và tên file
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

// Middleware kiểm tra quyền Admin
const checkAdmin = (req, res, next) => {
    const adminToken = req.headers.authorization;

    if (!adminToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const bearerToken = adminToken.split(' ')[1];

    // Kiểm tra nếu token không hợp lệ
    // if (!bearerToken) {
    //     return res.status(401).json({ message: 'Unauthorized: No token provided' });
    // }

    jwt.verify(bearerToken, process.env.JWT_SECRET || 'secretkey', async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }

        const db = await connectDb();
        const collection = db.collection('admin');
        const employees = await collection.find({ Quyen: 'Admin' }).toArray();

        // Kiểm tra quyền người dùng là Admin
        if (user.Quyen !== 'Admin') {
            return res.status(403).json({ message: 'Chỉ admin mới có quyền thực hiện thao tác này' });
        }

        req.user = employees; // Thêm thông tin user vào req để sử dụng sau
        next(); // Tiếp tục xử lý request
    });
};

// Lấy danh sách nhân viên theo quyền 'NhanVien'
router.get('/', checkAdmin, async (req, res) => {
    try {
        // Lấy token từ header
        const adminToken = req.headers.authorization?.split(' ')[1];
        if (!adminToken) {
            return res.status(401).json({ message: 'Unauthorized: No adminToken provided' });
        }

        // Giải mã và kiểm tra adminToken
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'secretkey');
        if (decoded.Quyen !== 'Admin') {
            return res.status(403).json({ message: 'Chỉ admin mới có quyền thực hiện thao tác này' });
        }

        // Nếu là admin, truy vấn DB để lấy danh sách nhân viên
        const db = await connectDb();
        const collection = db.collection('admin');
        const employees = await collection.find({ Quyen: 'NhanVien' }).toArray();

        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Lấy thông tin nhân viên theo id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');
        const employee = await collection.findOne({ _id: new ObjectId(id) });

        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Route kiểm tra tên đăng nhập và số điện thoại
router.post('/check-username', async (req, res) => {
    const { TenDangNhap, SDT, id } = req.body;

    try {
        const db = await connectDb();
        const collection = db.collection('admin');

        const existingUser = await collection.findOne({ TenDangNhap });
        const existingPhone = await collection.findOne({ SDT, _id: { $ne: new ObjectId(id) } }); // Kiểm tra số điện thoại không trùng với id hiện tại

        if (existingUser) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
        }

        if (existingPhone) {
            return res.status(400).json({ message: 'Số điện thoại đã tồn tại.' });
        }

        return res.status(200).json({ message: 'Tên đăng nhập và số điện thoại hợp lệ.' });
    } catch (error) {
        console.error('Có lỗi xảy ra khi kiểm tra tên đăng nhập hoặc số điện thoại:', error);
        return res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình kiểm tra.' });
    }
});

// Thêm nhân viên (Admin mới có quyền thêm)
router.post('/add', upload.single('Anh'), async (req, res) => {
    try {
        const { HoTen, TenDangNhap, DiaChi, NgaySinh, GioTinh, SDT, ChucVu, Tinhtrang } = req.body;

        if (!req.body.MatKhau) {
            return res.status(400).json({ message: 'Mật khẩu là bắt buộc' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Ảnh là bắt buộc' });
        }

        const hashedPassword = bcrypt.hashSync(req.body.MatKhau, 10);

        const db = await connectDb();
        const collection = db.collection('admin');

        const Anh = `/images/${req.file.filename}`;

        const newId = (await collection.countDocuments()) + 1; // Tạo ID mới

        const newEmployee = {
            id: newId,
            HoTen,
            TenDangNhap,
            MatKhau: hashedPassword,
            Anh,
            DiaChi,
            NgaySinh,
            GioTinh,
            SDT,
            ChucVu,
            Tinhtrang,
            Quyen: 'NhanVien',
            IsAdmin: 0 // Thêm thuộc tính IsAdmin mặc định là 0
        };

        await collection.insertOne(newEmployee);
        res.status(201).json({ message: 'Nhân viên đã được thêm thành công', employee: newEmployee });
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm nhân viên:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm nhân viên', error: error.message });
    }
});

// Sửa thông tin nhân viên (Chỉ Admin có quyền sửa)
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
    try {
        const { id } = req.params;
        const { HoTen, TenDangNhap, DiaChi, NgaySinh, GioTinh, SDT, ChucVu, Tinhtrang } = req.body;
        const db = await connectDb();
        const collection = db.collection('admin');

        const updatedEmployee = {
            HoTen,
            TenDangNhap,
            DiaChi,
            NgaySinh,
            GioTinh,
            SDT,
            ChucVu,
            Tinhtrang,
            IsAdmin: 0 // Thêm thuộc tính IsAdmin mặc định là 0
        };

        // Nếu có ảnh mới, cập nhật tên file ảnh
        if (req.file) {
            updatedEmployee.Anh = req.file.filename; // Lưu tên file ảnh mới
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedEmployee });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
        } else {
            res.json({ message: 'Cập nhật thông tin nhân viên thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});


// Xóa nhân viên (Chỉ Admin có quyền xóa)
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');

        const employee = await collection.findOne({ _id: new ObjectId(id) });

        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }

        // Xóa ảnh nhân viên nếu có
        if (employee.Anh) {
            const imagePath = path.join(__dirname, '../public/images/', employee.Anh);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Có lỗi khi xóa ảnh:', err);
                }
            });
        }

        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Xóa nhân viên thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

module.exports = router;
