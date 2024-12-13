// admin.js
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
// Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        // Thêm timestamp để tránh xung đột tên file
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Import model
const connectDb = require("../models/db");

router.post("/login", async (req, res, next) => {
    const { usernameOrEmail, MatKhau } = req.body;

    try {
        const db = await connectDb();
        const employeeCollection = db.collection("admin");
        let user = await employeeCollection.findOne({
            TenDangNhap: usernameOrEmail.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({ message: "Tên đăng nhập không đúng" });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Mật khẩu không chính xác" });
        }

        // Tạo JWT token
        const adminToken = jwt.sign(
            {
                id: user._id,
                TenDangNhap: user.TenDangNhap,
                Email: user.Email,
                SDT: user.SDT,
                HoTen: user.HoTen,
                IsAdmin: user.IsAdmin,
                ChucVu: user.ChucVu,
                Quyen: user.Quyen,
            },
            process.env.JWT_SECRET || "secretkey",
            // { expiresIn: "1h" }
        );

        // Trả về thông tin admin và adminToken
        res.status(200).json({
            adminToken,
            TenDangNhap: user.TenDangNhap,
            Email: user.Email,
            SDT: user.SDT,
            HoTen: user.HoTen,
            IsAdmin: user.IsAdmin,
            ChucVu: user.ChucVu,
            Quyen: user.Quyen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
    }
});

// API để lấy thông tin admin chi tiết
router.get('/detailadmin', async (req, res, next) => {
    const adminToken = req.headers.authorization;

    if (!adminToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const bearerToken = adminToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        // Kiểm tra xem người dùng có phải là admin không
        if (user.IsAdmin !== 0) {
            return res.status(403).json({ message: "Chỉ admin có quyền truy cập" });
        }

        const db = await connectDb();
        const employeeCollection = db.collection('admin');
        const userInfo = await employeeCollection.findOne({ TenDangNhap: user.TenDangNhap });

        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: "Không tìm thấy admin" });
        }
    });
});

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

// Lấy danh sách admin theo quyền 'Admin'
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

        // Nếu là admin, truy vấn DB để lấy danh sách admin
        const db = await connectDb();
        const collection = db.collection('admin');
        const employees = await collection.find({ Quyen: 'Admin' }).toArray();

        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Lấy thông tin admin theo id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');
        const employee = await collection.findOne({ _id: new ObjectId(id) });

        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
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

// Thêm admin (Admin mới có quyền thêm)
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
            Quyen: 'Admin',
            IsAdmin: 0 // Thêm thuộc tính IsAdmin mặc định là 0
        };

        await collection.insertOne(newEmployee);
        res.status(201).json({ message: 'admin đã được thêm thành công', employee: newEmployee });
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm admin:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm admin', error: error.message });
    }
});

// Sửa thông tin admin (Chỉ Admin có quyền sửa)
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

        // Lấy thông tin admin hiện tại để xóa ảnh cũ
        const currentEmployee = await collection.findOne({ _id: new ObjectId(id) });

        // Nếu có ảnh mới, cập nhật tên file ảnh
        if (req.file) {
            updatedEmployee.Anh = req.file.filename; // Lưu tên file ảnh mới

            // Xóa ảnh cũ nếu có
            if (currentEmployee.Anh) {
                const oldImagePath = path.join(__dirname, '../public/images/', currentEmployee.Anh);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Có lỗi xảy ra khi xóa ảnh cũ:', err);
                    }
                });
            }
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedEmployee });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy admin để cập nhật' });
        } else {
            res.json({ message: 'Cập nhật thông tin admin thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Xóa admin
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');

        const employee = await collection.findOne({ _id: new ObjectId(id) });

        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }

        // Xóa ảnh admin nếu có
        if (employee.Anh) {
            const imagePath = path.join(__dirname, '../public/images/', employee.Anh);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Có lỗi khi xóa ảnh:', err);
                }
            });
        }

        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Xóa admin thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

module.exports = router;