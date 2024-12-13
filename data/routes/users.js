// users.js ( api phía người dùng: http://localhost:3000/users/login )
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

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
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'screntime12@gmail.com',
    pass: 'cxgd hlre chto yjbz',
  },
});
const verificationCodesemail = {};
const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/users/send-code", async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ success: false, message: "Email là bắt buộc!" });
  }

  // Connect to the database
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");

  // Check if the email already exists in the database
  const existingUser = await userCollection.findOne({ Email });
  if (existingUser) {
    // Email exists, return error message
    return res.status(400).json({ success: false, message: "Email đã tồn tại xin nhập Email khác!" });
  }

  const verificationCode = generateVerificationCode();

  try {
    verificationCodesemail[Email] = verificationCode;
    await transporter.sendMail({
      from: 'screntime12@gmail.com',
      to: Email, // Địa chỉ người nhận
      subject: 'Mã xác nhận của bạn',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
              }
              .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                color: #333;
              }
              .verification-code {
                font-size: 24px;
                font-weight: bold;
                color: #007BFF;
                margin: 20px 0;
                text-align: center;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #aaa;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h1 class="header">Xác thực tài khoản của bạn</h1>
              <p>Chào bạn,</p>
              <p>Cảm ơn bạn đã đăng ký tài khoản với chúng tôi. Vui lòng nhập mã xác nhận dưới đây để hoàn tất quá trình đăng ký:</p>
              <div class="verification-code">
                Mã xác nhận của bạn là: <strong>${verificationCode}</strong>
              </div>
              <p>Chúng tôi sẽ luôn sẵn sàng hỗ trợ bạn nếu có bất kỳ thắc mắc nào.</p>
              <div class="footer">
                <p>Trân trọng,</p>
                <p>Đội ngũ hỗ trợ của chúng tôi</p>
              </div>
            </div>
          </body>
        </html>
      `
    });


    res.json({ success: true, message: 'Mã xác nhận đã được gửi!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi gửi mã xác nhận!' });
  }
});


router.post("/users/verify-code", async (req, res) => {
  const { Email, verificationCode } = req.body;  // Changed 'email' to 'Email'

  if (!Email || !verificationCode) {
    return res.status(400).json({ success: false, message: "Email và mã xác nhận là bắt buộc!" });
  }

  try {
    const storedCode = verificationCodesemail[Email];  // Changed 'verificationCodes[email]' to 'verificationCodesemail[Email]'

    if (!storedCode || storedCode !== verificationCode) {
      return res.status(400).json({ success: false, message: "Mã xác nhận không đúng!" });
    }

    // Xóa mã sau khi xác thực
    delete verificationCodesemail[Email];  // Changed to use 'verificationCodesemail[Email]'

    res.json({ success: true, message: "Xác thực thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra khi xác thực mã!" });
  }
});

router.post("/register", upload.single("Anh"), async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const { Email, MatKhau, SDT, TenDangNhap, Ten, NgaySinh, DiaChi, GioiTinh } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const newId = (await userCollection.countDocuments()) + 1;
    const { v4: uuidv4 } = require('uuid');
    // Check if the email already exists
    const existingUser = await userCollection.findOne({ Email });
    const User = await userCollection.findOne({ TenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });

      // Hash the password
    }
    if (User) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

      // Hash the password
    }
    const hashPassword = await bcrypt.hash(MatKhau, 10);

    // Create new user object
    const newUser = {
      id: uuidv4(),
      userId: newId,
      Email,
      NgaySinh,
      DiaChi,
      GioiTinh,
      MatKhau: hashPassword,
      SDT,
      TenDangNhap,
      Ten,
      Anh: imagePath ? req.file.filename : null,
      IsAdmin: 1,
      IsLocked: false
    };

    // Insert the new user into the collection
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      return res.status(200).json({ message: "Đăng ký thành công" });
    } else {
      return res.status(500).json({ message: "Đăng ký thất bại" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const userId = req.params.id; // Lấy userId từ tham số URL

    // Lấy thông tin cần cập nhật từ req.body
    const { Ten, Email, DiaChi, SDT, NgaySinh } = req.body;

    // Kiểm tra xem email mới có trùng với email của người dùng khác hay không
    const existingUser = await userCollection.findOne({ Email, id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Thực hiện cập nhật thông tin người dùng
    const updateUser = await userCollection.updateOne(
      { id: userId }, // Sử dụng userId thay vì uuidv4()
      {
        $set: {
          Ten,
          Email,
          DiaChi,
          SDT,
          NgaySinh,
          // không cần truyền userId vào đây nữa
        },
      }
    );

    if (updateUser.modifiedCount > 0) {
      return res.status(200).json({ message: "Cập nhật thành công" });
    } else {
      return res.status(400).json({ message: "Không có thay đổi nào" });
    }
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.put('/updateprofilepicture/:id', upload.single("Anh"), async (req, res) => {
  try {
    const userId = req.params.id;
    const fileName = req.file ? req.file.filename : null; // Lấy tên file thay vì đường dẫn

    const db = await connectDb(); // Đảm bảo kết nối đến MongoDB
    const userCollection = db.collection('taikhoan');

    // Kiểm tra nếu fileName là null
    if (!fileName) {
      return res.status(400).json({ message: 'Không có ảnh nào được tải lên.' });
    }

    // Cập nhật tên file trong cơ sở dữ liệu
    await userCollection.updateOne(
      { id: userId },
      { $set: { Anh: fileName } } // Cập nhật trường 'Anh' với tên file
    );

    return res.status(200).json({ message: 'Cập nhật ảnh thành công!', image: fileName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi!' });
  }
});

router.put("/updatepassword/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Kết nối tới MongoDB và chọn collection 'taikhoan'
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng theo ID
    const user = await userCollection.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Kiểm tra nếu user.MatKhau không hợp lệ
    if (!user.MatKhau) {
      return res.status(400).json({ message: 'Mật khẩu không hợp lệ.' });
    }

    console.log('Old Password:', oldPassword); // Kiểm tra giá trị oldPassword
    console.log('User Password Hash:', user.MatKhau); // Kiểm tra giá trị mật khẩu hash trong DB

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.MatKhau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng.' });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Sử dụng newPassword

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await userCollection.updateOne(
      { id: userId },
      { $set: { MatKhau: hashedPassword } } // Đảm bảo tên biến đồng nhất
    );

    return res.status(200).json({ message: 'Đổi mật khẩu thành công.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đổi mật khẩu.' });
  }
});

// Đăng nhập người dùng
router.post("/login", async (req, res, next) => {
  const { usernameOrEmail, MatKhau } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng bằng username hoặc email
    const user = await userCollection.findOne({
      $or: [{ TenDangNhap: usernameOrEmail }, { Email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(403).json({
        message: "Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.",
      });
    }

    // Kiểm tra nếu tài khoản đã bị khóa
    if (user.IsLocked) {
      return res.status(403).json({
        message: "Tài khoản của bạn đã bị khóa.",
      });
    }

    // So sánh mật khẩu không đồng bộ
    const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo token JWT không có thời gian hết hạn
    const token = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
        Ten: user.Ten,
        IsAdmin: user.IsAdmin,
      },
      process.env.JWT_SECRET || "secretkey" // Không cần `expiresIn`
    );

    // Gửi token qua cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Chỉ có thể truy cập từ server
      secure: process.env.NODE_ENV === "production", // Chỉ gửi qua HTTPS trong môi trường production
      maxAge: 365 * 24 * 60 * 60 * 1000, // Cookie sẽ hết hạn sau 1 năm
    });

    // Trả về thông tin người dùng mà không trả lại token trong body
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      TenDangNhap: user.TenDangNhap,
      Email: user.Email,
      SDT: user.SDT,
      Ten: user.Ten,
      IsAdmin: user.IsAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});


router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("taikhoan");
  let id = req.params.id;

  // Sử dụng ObjectId nếu id là ObjectId trong MongoDB
  const users = await usersCollection.findOne({ _id: ObjectId(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});



router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("taikhoan");
  let id = req.params.id;

  // Sử dụng ObjectId nếu id là ObjectId trong MongoDB
  const users = await usersCollection.findOne({ _id: ObjectId(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Thêm API để lấy tên người dùng theo ID
router.get("/users/:id/Ten", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  let id = req.params.id;

  try {
    const user = await userCollection.findOne(
      { _id: ObjectId(id) }, // Sử dụng ObjectId
      { projection: { Ten: 1 } } // Chỉ lấy trường Ten
    );
    if (user) {
      res.status(200).json({ Ten: user.Ten });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});

// API để lấy thông tin người dùng chi tiết
router.get('/detailuser', async (req, res, next) => {
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
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  });
});




module.exports = router;



// router.post("/forgot-password", async (req, res) => {
//   const { Email } = req.body;

//   try {
//     const db = await connectDb();
//     const userCollection = db.collection("taikhoan");

//     // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
//     const user = await userCollection.findOne({ Email });
//     if (!user) {
//       return res.status(400).json({ message: "Email không tồn tại trong hệ thống" });
//     }

//     // Tạo mã xác thực 6 chữ số ngẫu nhiên
//     const verificationCode = Math.floor(100000 + Math.random() * 900000); // Tạo mã 6 chữ số

//     // Gửi email chứa mã xác thực (sử dụng Nodemailer)

//     const mailOptions = {
//       from: 'screntime12@gmail.com',
//       to: Email,
//       subject: 'Mã xác thực để đặt lại mật khẩu',
//       text: `Mã xác thực của bạn là: ${verificationCode}\nVui lòng nhập mã này để đặt lại mật khẩu.`,
//     };

//     // Gửi email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Lỗi khi gửi email:', error);
//         return res.status(500).json({ message: "Gửi email thất bại" });
//       }

//       console.log('Email đã được gửi:', info.response);
//       return res.status(200).json({ message: "Mã xác thực đã được gửi tới email của bạn", verificationCode }); // Không lưu mã nhưng trả lại để sử dụng trên frontend nếu cần
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
//   }
// });

const verificationCodes = {};

router.post("/forgot-password", async (req, res) => {
  const { Email } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    const user = await userCollection.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại trong hệ thống" });
    }

    // Tạo mã xác thực 6 chữ số ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 999999); // Tạo mã 6 chữ số

    // Lưu mã xác thực vào bộ nhớ (hoặc database, nếu cần)
    verificationCodes[Email] = verificationCode;

    // Gửi email chứa mã xác thực (sử dụng Nodemailer)
    const mailOptions = {
      from: 'screntime12@gmail.com',
      to: Email,
      subject: 'Mã xác thực để đặt lại mật khẩu',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50; text-align: center;">Đặt lại mật khẩu</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Chào bạn, <br><br>
              Để đảm bảo tính bảo mật, chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn. Vui lòng sử dụng mã xác thực dưới đây để hoàn tất quá trình đặt lại mật khẩu.
            </p>
            <h3 style="color: #4CAF50; text-align: center; font-size: 22px; font-weight: bold;">${verificationCode}</h3>
            <p style="font-size: 16px; line-height: 1.6;">
              <strong>Lưu ý:</strong> Mã xác thực này không chia sẽ ra bên ngoài. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Trân trọng,<br>
              Đội ngũ hỗ trợ khách hàng
            </p>
          </div>
        </div>
      `,
    };


    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Lỗi khi gửi email:', error);
        return res.status(500).json({ message: "Gửi email thất bại" });
      }

      console.log('Email đã được gửi:', info.response);
      return res.status(200).json({ message: "Mã xác thực đã được gửi tới email của bạn" }); // Không trả lại mã
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.post("/verify-code", async (req, res) => {
  const { Email, verificationCode } = req.body;

  if (verificationCodes[Email] === Number(verificationCode)) {
    // Mã xác thực hợp lệ, tiến hành đổi mật khẩu
    return res.status(200).json({ message: "Mã xác thực hợp lệ" });
  } else {
    return res.status(400).json({ message: "Mã xác thực không chính xác" });
  }
});


router.post("/reset-password", async (req, res) => {
  const { Email, newPassword } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Kiểm tra xem email có tồn tại không
    const user = await userCollection.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại trong hệ thống" });
    }

    // Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    await userCollection.updateOne(
      { Email },
      { $set: { MatKhau: hashedPassword } }
    );

    return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
module.exports = router;