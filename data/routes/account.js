const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

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

// Lấy danh sách tài khoản
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan'); // Thay 'taikhoan' bằng tên collection thực tế
    const accounts = await collection.find().toArray();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin tài khoản theo id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');
    const account = await collection.findOne({ _id: new ObjectId(id) });

    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Kiểm tra tên đăng nhập và số điện thoại có tồn tại hay không
router.post('/check-username', async (req, res) => {
  const { TenDangNhap, SDT } = req.body;

  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const existingUser = await collection.findOne({ TenDangNhap });
    const existingPhone = await collection.findOne({ SDT });

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


// Sửa thông tin tài khoản
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
  try {
    const { id } = req.params;
    const { Ten, TenDangNhap, DiaChi, NgaySinh, GioiTinh, SDT, Email } = req.body;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const updatedAccount = {
      Ten,
      TenDangNhap,
      DiaChi,
      NgaySinh,
      GioiTinh,
      SDT,
      Email
    };

    // Lấy thông tin tài khoản hiện tại để xóa ảnh cũ
    const currentAccount = await collection.findOne({ _id: new ObjectId(id) });

    // Nếu có ảnh mới, cập nhật tên file ảnh
    if (req.file) {
      updatedAccount.Anh = req.file.filename; // Lưu tên file ảnh mới

      // Xóa ảnh cũ nếu có
      if (currentAccount.Anh) {
        const oldImagePath = path.join(__dirname, '../public/images/', currentAccount.Anh);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Có lỗi xảy ra khi xóa ảnh cũ:', err);
          }
        });
      }
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedAccount });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để cập nhật' });
    } else {
      res.json({ message: 'Cập nhật thông tin tài khoản thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Xóa tài khoản
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để xóa' });
    } else {
      res.json({ message: 'Tài khoản đã được xóa thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Khóa tài khoản (đóng băng tài khoản)
router.put('/lock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    // Cập nhật trạng thái khóa tài khoản
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { IsLocked: true } });

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để khóa' });
    } else {
      res.json({ message: 'Tài khoản đã bị khóa và đóng băng' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Mở khóa tài khoản
router.put('/unlock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    // Cập nhật trạng thái mở khóa tài khoản
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { IsLocked: false } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản để mở khóa' });
    } else {
      return res.json({ message: 'Tài khoản đã được mở khóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});



module.exports = router;