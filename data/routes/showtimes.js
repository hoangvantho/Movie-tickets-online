const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');

// Lấy danh sách phòng chiếu của rạp
router.get('/phongchieu', async (req, res) => {
  try {
    const db = await connectDb();
    const rapCollection = db.collection('rap');

    // Lấy rạp đầu tiên (chỉ có một rạp)
    const rap = await rapCollection.findOne({});

    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    // Trả về danh sách phòng chiếu
    res.status(200).json(rap.PhongChieu);
  } catch (error) {
    console.error('Lỗi khi lấy phòng chiếu:', error);
    res.status(500).json({ message: 'Lỗi khi lấy phòng chiếu', error });
  }
});

// Lấy danh sách suất chiếu
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('suatchieu');
    const showtimes = await collection.find({}).toArray();

    // Lấy danh sách phim để ánh xạ IdPhim với tên phim
    const movieCollection = db.collection('phim');
    const movies = await movieCollection.find({}).toArray();
    const movieMap = {};
    movies.forEach(movie => {
      movieMap[movie.id.toString()] = {
        Ten: movie.Ten,
        Anh: movie.Anh,
        KieuPhim: movie.TheLoai.KieuPhim, // Lấy KieuPhim từ TheLoai
      };
    });

    // Lấy danh sách rạp để ánh xạ IdPhong với tên phòng
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = room.TenPhongChieu; // Giả định bạn có thuộc tính TenPhongChieu trong bảng rạp
      });
    });

    // Thêm tên phim, ảnh, thể loại và DaDatGhe vào danh sách suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => ({
      ...showtime,
      Anh: movieMap[showtime.IdPhim.toString()]?.Anh || 'Không xác định',
      Ten: movieMap[showtime.IdPhim.toString()]?.Ten || 'Không xác định',
      KieuPhim: movieMap[showtime.IdPhim.toString()]?.KieuPhim || 'Không xác định',
      TenPhongChieu: theaterMap[showtime.IdPhong] || 'Không xác định',
      DaDatGhe: showtime.DaDatGhe || [] // Thêm trường DaDatGhe
    }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy danh sách suất chiếu đang chiếu
router.get('/dangchieu', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    // Chỉ lấy những suất chiếu có trạng thái là "DangChieu"
    const showtimes = await collection.find({ TrangThai: "DangChieu" }).toArray();

    // Lấy danh sách phim để ánh xạ IdPhim với tên phim, ảnh, thể loại, và các thông tin khác
    const movieCollection = db.collection('phim');
    const movies = await movieCollection.find({}).toArray();
    const movieMap = {};
    movies.forEach(movie => {
      movieMap[movie.id.toString()] = {
        Ten: movie.Ten,
        Anh: movie.Anh,
        KieuPhim: movie.TheLoai?.KieuPhim || 'Không xác định', // Giả định TheLoai có thể không có KieuPhim
        ThoiLuong: movie.TheLoai?.ThoiLuong || 'Không xác định', // Thêm thời lượng
        DaoDien: movie.MoTa?.DaoDien || 'Không xác định', // Thêm đạo diễn
        DienVien: movie.MoTa?.DienVien || 'Không xác định', // Thêm diễn viên
      };
    });

    // Lấy danh sách rạp để ánh xạ IdPhong với tên phòng
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = room.TenPhongChieu; // Giả định room có thuộc tính TenPhongChieu
      });
    });

    // Thêm các thuộc tính chi tiết cho mỗi suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => ({
      ...showtime,
      Anh: movieMap[showtime.IdPhim.toString()]?.Anh || 'Không xác định',         // Ảnh phim
      Ten: movieMap[showtime.IdPhim.toString()]?.Ten || 'Không xác định',         // Tên phim
      KieuPhim: movieMap[showtime.IdPhim.toString()]?.KieuPhim || 'Không xác định', // Kiểu phim
      ThoiLuong: movieMap[showtime.IdPhim.toString()]?.ThoiLuong || 'Không xác định', // Thời lượng phim
      DaoDien: movieMap[showtime.IdPhim.toString()]?.DaoDien || 'Không xác định', // Đạo diễn
      DienVien: movieMap[showtime.IdPhim.toString()]?.DienVien || 'Không xác định', // Diễn viên
      TenPhongChieu: theaterMap[showtime.IdPhong] || 'Không xác định',           // Tên phòng chiếu
      DaDatGhe: showtime.DaDatGhe || []                                          // Danh sách ghế đã đặt
    }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin suất chiếu theo id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('suatchieu');
    const showtime = await collection.findOne({ _id: new ObjectId(id) });

    if (!showtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }
    res.json(showtime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Thêm suất chiếu
router.post('/add', async (req, res) => {
  try {
    const { NgayChieu, GioChieu, IdPhim, IdPhong, TrangThai, DaDatGhe = [] } = req.body; // Thêm DaDatGhe

    const db = await connectDb();
    const collection = db.collection('suatchieu');

    // Chuyển đổi IdPhim và IdPhong từ chuỗi sang số
    const idPhim = parseInt(IdPhim, 10);
    const idPhong = parseInt(IdPhong, 10);

    // Tạo ID mới bằng cách đếm số tài liệu hiện có
    const newId = await collection.countDocuments() + 1; // Tạo ID mới

    const newShowtime = {
      id: newId, // Gán ID mới
      NgayChieu,
      GioChieu,
      IdPhim: idPhim, // Sử dụng idPhim đã chuyển đổi
      IdPhong: idPhong, // Sử dụng idPhong đã chuyển đổi
      TrangThai,
      DaDatGhe,
    };

    // Thêm suất chiếu vào cơ sở dữ liệu
    await collection.insertOne(newShowtime);

    // Trả về thông báo thành công cùng với suất chiếu vừa tạo
    res.status(201).json({ message: 'Suất chiếu đã được thêm thành công', showtime: newShowtime });
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm suất chiếu:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm suất chiếu', error: error.message });
  }
});

// Sửa thông tin suất chiếu
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayChieu, GioChieu, IdPhim, IdPhong, TrangThai, DaDatGhe } = req.body; // Nhận các trường từ yêu cầu
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    const updatedShowtime = {
      NgayChieu,
      GioChieu,
      IdPhim,
      IdPhong,
      TrangThai,
      DaDatGhe // Cập nhật DaDatGhe
    };

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedShowtime });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy suất chiếu để cập nhật' });
    } else {
      // Trả về thông tin suất chiếu đã được cập nhật
      res.json({ message: 'Cập nhật thông tin suất chiếu thành công', updatedShowtime });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Xóa suất chiếu
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy suất chiếu để xóa' });
    } else {
      res.json({ message: 'Suất chiếu đã được xóa thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin phòng chiếu theo suất chiếu
router.get('/phongchieu/:id', async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ tham số
    const db = await connectDb();
    const suatChieuCollection = db.collection('suatchieu');

    // Lấy thông tin suất chiếu theo ID
    const showtime = await suatChieuCollection.findOne({ _id: new ObjectId(id) });

    if (!showtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    // Lấy rạp đầu tiên (chỉ có một rạp)
    const rapCollection = db.collection('rap');
    const rap = await rapCollection.findOne({});

    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    // Tìm phòng chiếu tương ứng với suất chiếu
    const phongChieu = rap.PhongChieu.find(phong => phong.id === showtime.IdPhong);

    if (!phongChieu) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu tương ứng với suất chiếu' });
    }

    // Trả về thông tin phòng chiếu
    res.status(200).json(phongChieu);
  } catch (error) {
    console.error('Lỗi khi lấy phòng chiếu theo suất chiếu:', error);
    res.status(500).json({ message: 'Lỗi khi lấy phòng chiếu theo suất chiếu', error });
  }
});

router.get('/phim/:IdPhim', async (req, res) => {
  try {
    const { IdPhim } = req.params;
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');

    // Lấy danh sách suất chiếu có IdPhim trùng khớp
    const showtimes = await showtimesCollection
      .find({ IdPhim: parseInt(IdPhim) })
      .toArray();

    if (showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho phim này' });
    }

    // Lấy danh sách các rạp
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = {
          TenPhongChieu: room.TenPhongChieu,
          TenRap: theater.TenRap,
          ViTri: theater.ViTri,
          Ghe: room.Ghe // Lấy thông tin ghế trong phòng chiếu
        };
      });
    });

    // Lấy các phòng chiếu và giờ chiếu cho mỗi suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => {
      const roomDetails = theaterMap[showtime.IdPhong];
      return {
        ...showtime,
        TenPhongChieu: roomDetails?.TenPhongChieu || 'Không xác định',
        TenRap: roomDetails?.TenRap || 'Không xác định',
        ViTri: roomDetails?.ViTri || 'Không xác định',
        Ghe: roomDetails?.Ghe || [] // Danh sách ghế trong phòng chiếu
      };
    });

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách suất chiếu theo phim:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

router.get('/phim/:IdPhim/dangchieu', async (req, res) => {
  try {
    const { IdPhim } = req.params;
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');

    // Lấy danh sách suất chiếu có IdPhim trùng khớp và TrangThai là "DangChieu"
    const showtimes = await showtimesCollection
      .find({
        IdPhim: parseInt(IdPhim),
        TrangThai: "DangChieu" // Lọc theo trạng thái "DangChieu"
      })
      .toArray();

    if (showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu đang chiếu cho phim này' });
    }

    // Lấy danh sách các rạp
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = {
          TenPhongChieu: room.TenPhongChieu,
          TenRap: theater.TenRap,
          ViTri: theater.ViTri,
          Ghe: room.Ghe // Lấy thông tin ghế trong phòng chiếu
        };
      });
    });

    // Lấy các phòng chiếu và giờ chiếu cho mỗi suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => {
      const roomDetails = theaterMap[showtime.IdPhong];
      return {
        ...showtime,
        TenPhongChieu: roomDetails?.TenPhongChieu || 'Không xác định',
        TenRap: roomDetails?.TenRap || 'Không xác định',
        ViTri: roomDetails?.ViTri || 'Không xác định',
        Ghe: roomDetails?.Ghe || [] // Danh sách ghế trong phòng chiếu
      };
    });

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách suất chiếu theo phim:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

router.get('/ghe/:IdPhong/:GioChieu/:IdPhim', async (req, res) => {
  try {
    const { IdPhong, GioChieu, IdPhim } = req.params;
    const db = await connectDb();

    // Lấy thông tin rạp và phòng chiếu theo IdPhong
    const rapCollection = db.collection('rap');
    const rap = await rapCollection.findOne({});
    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    const phongChieu = rap.PhongChieu.find(phong => phong.id === parseInt(IdPhong));
    if (!phongChieu) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu' });
    }

    // Lấy danh sách suất chiếu theo IdPhim, IdPhong và GioChieu
    const suatChieuCollection = db.collection('suatchieu');
    const suatChieu = await suatChieuCollection.findOne({
      IdPhong: parseInt(IdPhong),
      GioChieu: GioChieu,
      IdPhim: parseInt(IdPhim)
    });

    if (!suatChieu) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho phim, phòng và giờ này' });
    }

    // Dữ liệu ghế theo phòng chiếu
    const ghe = phongChieu.Ghe.map(gheHang => {
      return {
        Hang: gheHang.Hang,
        Ghe: gheHang.Ghe.map(ghe => {
          // Kiểm tra ghế đã đặt hay chưa
          const isBooked = suatChieu.DaDatGhe.includes(ghe);
          return {
            Ghe: ghe,
            DaDat: isBooked // Đánh dấu ghế đã đặt hay chưa
          };
        })
      };
    });

    res.status(200).json(ghe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});


router.post('/capnhatghedadat', async (req, res) => {
  try {
    const { IdPhong, GioChieu, IdPhim, SoGhe } = req.body;

    // Kết nối đến database
    const db = await connectDb();

    // Kiểm tra và xác thực dữ liệu đầu vào
    if (!IdPhong || !GioChieu || !IdPhim || !SoGhe || !Array.isArray(SoGhe)) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }

    // Kết nối với collection suất chiếu
    const suatChieuCollection = db.collection('suatchieu');

    // Tìm suất chiếu tương ứng
    const suatChieu = await suatChieuCollection.findOne({
      IdPhong: parseInt(IdPhong),
      GioChieu: GioChieu,
      IdPhim: parseInt(IdPhim)
    });

    if (!suatChieu) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    // Cập nhật danh sách ghế đã đặt
    const updatedResult = await suatChieuCollection.updateOne(
      {
        IdPhong: parseInt(IdPhong),
        GioChieu: GioChieu,
        IdPhim: parseInt(IdPhim)
      },
      {
        $addToSet: {
          DaDatGhe: { $each: SoGhe }
        }
      }
    );

    if (updatedResult.modifiedCount === 0) {
      return res.status(500).json({ message: 'Không thể cập nhật ghế đã đặt' });
    }

    res.status(200).json({
      message: 'Cập nhật ghế đã đặt thành công',
      updatedSeats: SoGhe
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    });
  }
});

router.post('/huyghedadat', async (req, res) => {
  try {
    const { IdPhong, GioChieu, IdPhim, NgayChieu, SoGhe, InvoiceId } = req.body;

    // Kết nối đến database
    const db = await connectDb();

    // Kiểm tra và xác thực dữ liệu đầu vào
    if (!IdPhong || !GioChieu || !IdPhim || !NgayChieu || !SoGhe || !Array.isArray(SoGhe) || !InvoiceId) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }

    // 1. **Cập nhật trạng thái hóa đơn**
    const invoicesCollection = db.collection('hoadon');

    // Lấy và kiểm tra ID hóa đơn
    const invoiceId = parseInt(InvoiceId, 10);
    if (isNaN(invoiceId) || invoiceId <= 0) {
      return res.status(400).json({ message: 'ID hóa đơn không hợp lệ' });
    }

    // Cập nhật trạng thái hóa đơn
    const invoiceResult = await invoicesCollection.updateOne(
      { id: invoiceId },
      { $set: { TrangThai: "Đã Hủy" } }
    );

    if (invoiceResult.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
    }

    console.log(`Cập nhật trạng thái hóa đơn thành công: ID ${InvoiceId}`);

    // 2. **Hủy ghế đã đặt**
    const suatChieuCollection = db.collection('suatchieu');

    // Tìm suất chiếu tương ứng
    const suatChieu = await suatChieuCollection.findOne({
      IdPhong: parseInt(IdPhong),
      GioChieu: GioChieu,
      IdPhim: parseInt(IdPhim),
      NgayChieu: NgayChieu
    });

    if (!suatChieu) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    // Xóa ghế đã đặt
    const updatedResult = await suatChieuCollection.updateOne(
      {
        IdPhong: parseInt(IdPhong),
        GioChieu: GioChieu,
        IdPhim: parseInt(IdPhim),
        NgayChieu: NgayChieu
      },
      {
        $pullAll: { DaDatGhe: SoGhe }
      }
    );

    if (updatedResult.modifiedCount === 0) {
      return res.status(500).json({ message: 'Không thể hủy ghế đã đặt' });
    }

    console.log(`Hủy ghế thành công: ${SoGhe}`);

    // 3. **Trả về phản hồi thành công**
    res.status(200).json({
      message: 'Hủy ghế và cập nhật trạng thái hóa đơn thành công',
      canceledSeats: SoGhe,
      invoiceId: InvoiceId
    });

  } catch (error) {
    console.error('Lỗi khi hủy ghế và cập nhật hóa đơn:', error);
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình xử lý',
      error: error.message
    });
  }
});

module.exports = router;