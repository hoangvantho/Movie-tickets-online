// routes/rap.js
var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require('../models/db');

router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Kiểm tra xem ID có hợp lệ không
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }

        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });

        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.status(200).json(rap);
    } catch (error) {
        console.error('Lỗi khi tìm rạp:', error);
        res.status(500).json({ message: 'Lỗi khi tìm rạp', error });
    }
});

// Lấy danh sách rạp
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');
        const raps = await rapCollection.find().toArray();
        res.status(200).json(raps);
    } catch (error) {
        console.error('Error fetching raps:', error);
        res.status(500).json({ message: 'Failed to fetch raps' });
    }
});

// Tạo mới rạp
router.post('/', async (req, res) => {
    const { TenRap, ViTri, PhongChieu } = req.body; // Nhận thêm PhongChieu từ request body

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!TenRap || !ViTri) {
        return res.status(400).json({ message: 'Tên rạp và vị trí không được để trống!' });
    }

    // Kiểm tra tính hợp lệ của phòng chiếu
    if (!PhongChieu || !Array.isArray(PhongChieu) || PhongChieu.length === 0) {
        return res.status(400).json({ message: 'Danh sách phòng chiếu không được để trống!' });
    }

    // Kiểm tra từng phòng chiếu trong danh sách
    for (const phong of PhongChieu) {
        if (!phong.TenPhongChieu || !phong.SoLuongGhe) {
            return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
        }
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const newRap = {
            TenRap,
            ViTri,
            PhongChieu // Gửi danh sách phòng chiếu vào database
        };

        const result = await rapCollection.insertOne(newRap);
        const createdRap = result.ops[0]; // Lấy thông tin rạp vừa tạo

        // Kiểm tra xem rạp đã được tạo thành công chưa
        if (!createdRap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        // Trả về thông điệp thành công và thông tin rạp
        res.status(500).json({
            message: 'Rạp chiếu đã được tạo thành công!',
            rap: createdRap // Gửi thông tin rạp vừa tạo
        });
    } catch (error) {
        console.error('Lỗi khi tạo rạp:', error);
        res.status(201).json({ message: 'Lỗi khi tạo rạp', error });
    }
});

// Sửa thông tin rạp bằng _id
router.put('/:id', async (req, res) => {
    const { TenRap, ViTri } = req.body; // Bỏ SoLuongPhong

    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const updatedRap = await rapCollection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { TenRap, ViTri } },
            { returnDocument: 'after' }
        );

        if (updatedRap.value) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.json({
            message: 'Rạp chiếu đã được cập nhật thành công!',
            rap: updatedRap.value // Gửi thông tin rạp đã cập nhật
        });
    } catch (error) {
        console.error('Lỗi khi sửa rạp:', error);
        res.status(500).json({ message: 'Lỗi khi sửa rạp', error });
    }
});

// Xóa rạp
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const result = await rapCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.json({ message: 'Rạp đã được xóa' });
    } catch (error) {
        console.error('Lỗi khi xóa rạp:', error);
        res.status(500).json({ message: 'Lỗi khi xóa rạp', error });
    }
});

// Lấy danh sách phòng chiếu của rạp
router.get('/:id/phong-chieu', async (req, res) => {
    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Tìm rạp theo ID và lấy thông tin phòng chiếu
        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) }, { projection: { PhongChieu: 1 } });

        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.status(200).json(rap.PhongChieu); // Trả về danh sách phòng chiếu
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách phòng chiếu', error });
    }
});

router.post('/:id/phong-chieu', async (req, res) => {
    let { TenPhongChieu, SoLuongGhe } = req.body;

    if (!TenPhongChieu || !SoLuongGhe) {
        return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
    }

    SoLuongGhe = Number(SoLuongGhe);

    if (isNaN(SoLuongGhe) || SoLuongGhe <= 0) {
        return res.status(400).json({ message: 'Số lượng ghế phải là số hợp lệ lớn hơn 0!' });
    }

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Tìm rạp và kiểm tra trùng tên phòng chiếu
        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        const isDuplicate = rap.PhongChieu?.some(
            (phong) =>
                phong.TenPhongChieu.trim().toLowerCase() === TenPhongChieu.trim().toLowerCase()
        );

        if (isDuplicate) {
            return res.status(400).json({ message: 'Tên phòng chiếu đã tồn tại. Vui lòng chọn tên khác!' });
        }

        // Tạo ID và dữ liệu ghế mới
        const nextPhongId = (rap?.PhongChieu?.length || 0) + 1;
        const gheData = generateGheData(TenPhongChieu, SoLuongGhe);

        const newPhongChieu = {
            id: nextPhongId,
            TenPhongChieu,
            SoLuongGhe,
            Ghe: gheData,
        };

        // Thêm phòng chiếu mới vào danh sách
        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $push: { PhongChieu: newPhongChieu } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Rạp không tìm thấy hoặc không có thay đổi' });
        }

        res.status(200).json({ message: 'Phòng chiếu đã được thêm thành công!', newPhongChieu });
    } catch (error) {
        console.error('Lỗi khi thêm phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi thêm phòng chiếu', error });
    }
});

// Hàm tự động tạo dữ liệu ghế
function generateGheData(TenPhongChieu, soLuongGhe) {
    const gheData = [];
    const soHang = Math.ceil(soLuongGhe / 10); // Mỗi hàng có tối đa 10 ghế
    let gheIndex = 1;

    for (let hang = 1; hang <= soHang; hang++) {
        const hangLabel = String.fromCharCode(64 + hang); // A, B, C, ...
        const danhSachGhe = [];

        for (let i = 1; i <= 10 && gheIndex <= soLuongGhe; i++) {
            danhSachGhe.push(`${hangLabel}${i}`); // Ví dụ: A1, A2, ...
            gheIndex++;
        }

        gheData.push({ Hang: hangLabel, Ghe: danhSachGhe });
    }

    return gheData;
}

router.put('/:id/phong-chieu/:phongId', async (req, res) => {
    const { TenPhongChieu, SoLuongGhe, Ghe } = req.body;

    // Kiểm tra thông tin yêu cầu không bị thiếu
    if (!TenPhongChieu || !SoLuongGhe || !Ghe) {
        return res.status(400).json({ message: 'Tên phòng chiếu, số lượng ghế và danh sách ghế không được để trống!' });
    }

    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID rạp không hợp lệ' });
    }

    // Kiểm tra xem phongId có phải là số hợp lệ không
    const phongId = Number(req.params.phongId);
    if (isNaN(phongId) || phongId <= 0) {
        return res.status(400).json({ message: 'ID phòng chiếu phải là một số hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Lấy rạp hiện tại và kiểm tra trùng tên phòng chiếu
        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        const isDuplicate = rap.PhongChieu?.some(
            (phong) =>
                phong.TenPhongChieu.trim().toLowerCase() === TenPhongChieu.trim().toLowerCase() &&
                phong.id !== phongId // Bỏ qua phòng chiếu đang được sửa
        );

        if (isDuplicate) {
            return res.status(400).json({ message: 'Tên phòng chiếu đã tồn tại. Vui lòng chọn tên khác!' });
        }

        // Cập nhật thông tin phòng chiếu
        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id), 'PhongChieu.id': phongId },
            {
                $set: {
                    'PhongChieu.$.TenPhongChieu': TenPhongChieu,
                    'PhongChieu.$.SoLuongGhe': SoLuongGhe,
                    'PhongChieu.$.Ghe': Ghe,
                },
            }
        );

        // Nếu không tìm thấy phòng chiếu hoặc rạp
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Rạp hoặc phòng chiếu không tìm thấy' });
        }

        res.status(200).json({ message: 'Thông tin phòng chiếu đã được cập nhật thành công!' });
    } catch (error) {
        console.error('Lỗi khi sửa phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi sửa phòng chiếu', error });
    }
});

// Xóa phòng chiếu trong rạp
router.delete('/:id/phong-chieu/:phongId', async (req, res) => {
    const { id, phongId } = req.params; // Get the ID of the theater and the room
    console.log('Theater ID:', id); // Log the theater ID
    console.log('Room ID:', phongId); // Log the room ID

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Kiểm tra xem phongId có phải là số hợp lệ không
        if (isNaN(phongId)) {
            return res.status(400).json({ message: 'ID phòng chiếu không hợp lệ' });
        }

        // Nếu phongId hợp lệ, tiếp tục xử lý
        const result = await rapCollection.updateOne(
            { _id: new ObjectId(id) }, // Tìm rạp theo _id (vẫn là ObjectId)
            { $pull: { PhongChieu: { id: Number(phongId) } } } // Pull phòng chiếu theo id (là số)
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Rạp hoặc phòng chiếu không tìm thấy' });
        }

        res.status(200).json({ message: 'Phòng chiếu đã được xóa thành công!' });
    } catch (error) {
        console.error('Lỗi khi xóa phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi xóa phòng chiếu', error });
    }
});



// In the `rapchieu` API file
router.get('/phongchieu/:id', async (req, res) => {
    const roomId = req.params.id;

    try {
        const db = await connectDb();
        const cinemasCollection = db.collection('rap');
 
        // Find the cinema that contains the requested screening room
        const cinema = await cinemasCollection.findOne(
            { "PhongChieu.id": parseInt(roomId) },
            { projection: { "PhongChieu.$": 1 } } // Only return the specific screening room
        );

        if (cinema && cinema.PhongChieu.length > 0) {
            res.status(200).json(cinema.PhongChieu[0]); // Return the screening room details
        } else {
            res.status(404).json({ message: 'Screening room not found' });
        }
    } catch (error) {
        console.error('Error fetching screening room:', error);
        res.status(500).json({ message: 'Failed to fetch screening room' });
    }
});

module.exports = router;