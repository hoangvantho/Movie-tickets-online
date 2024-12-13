var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db"); // Giả sử đây là file kết nối DB
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  },
});

 // Fetch all blogs
 router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const blogCollection = db.collection("blog");
    const blogs = await blogCollection.find().toArray();

    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



router.get("/limit", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Mặc định giới hạn là 10 blog

  try { 
    const db = await connectDb();
    if (!db) {
      console.error("Database connection failed");
      return res.status(500).json({ message: "Database connection failed" });
    }

    const blogCollection = db.collection("blog");

    const blogs = await blogCollection
      .find()
      .limit(limit) // Giới hạn số lượng blog trả về
      .toArray();

    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch blog by _ID
router.get("/:id", async (req, res) => {
  const blogId = parseInt(req.params.id); // Chuyển ID từ chuỗi sang số

  try {
    const db = await connectDb(); // Kết nối đến MongoDB
    const blogCollection = db.collection('blog');

    // Kiểm tra xem ID có hợp lệ không
    if (isNaN(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    // Tìm blog theo ID
    const blog = await blogCollection.findOne({ id: blogId });

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/details", async (req, res) => {
  const blogId = parseInt(req.params.id); // Chuyển đổi ID từ chuỗi sang số
  console.log(`Fetching details for blog with ID: ${blogId}`);

  try {
    const db = await connectDb(); // Kết nối đến MongoDB
    const blogCollection = db.collection('blog');
    const blogDetailCollection = db.collection('blogdetial');

    // Tìm blog theo ID
    const blog = await blogCollection.findOne({ id: blogId });
    console.log('Blog found:', blog);

    if (blog) {
      // Nếu tìm thấy blog, tìm tất cả chi tiết blog tương ứng bằng MaBlog
      const blogDetails = await blogDetailCollection.find({ MaBlog: blog.id }).toArray(); // Sử dụng find và toArray để lấy tất cả

      console.log('Blog details found:', blogDetails);

      if (blogDetails.length > 0) {
        res.status(200).json(blogDetails); // Trả về mảng các chi tiết blog
      } else {
        res.status(404).json({ message: "Chi tiết blog không tìm thấy!" });
      }
    } else {
      res.status(404).json({ message: "Blog không tìm thấy!" });
    }
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const movieId = req.params.id; // Lấy ID từ URL
//     const db = await connectDb();
//     const moviesCollection = db.collection('phim'); // Tên collection là 'phim'

//     // Tìm phim theo _id (Lưu ý sử dụng ObjectId cho trường _id)
//     const movie = await moviesCollection.findOne({ _id: new ObjectId(movieId) });

//     if (movie) {
//       res.status(200).json(movie);
//     } else {
//       res.status(404).json({ message: 'Phim không tồn tại' });
//     }
//   } catch (error) {
//     console.error('Error fetching movie by ID:', error);
//     res.status(500).json({ message: 'Lỗi khi tìm phim theo ID' });
//   }
// });

// API to add a new blog
router.post("/add", upload.single("Anh"), async (req, res) => {
  try {
    const newBlog = JSON.parse(req.body.newBlog);
    let Anh = req.file ? `/images/blog/${req.file.filename}` : "";

    const blogId = new ObjectId();

    const blogData = {
      _id: blogId,
      id: blogId.toString(),
      TenBlog: newBlog.TenBlog,
      Anh: Anh,
      LuotXem: newBlog.LuotXem,
    };

    const db = await connectDb();
    const blogCollection = db.collection("blog");
    await blogCollection.insertOne(blogData);

    res.status(201).json(blogData);
  } catch (error) {
    console.error("Error adding blog:", error);
    res
      .status(500)
      .json({ message: "Failed to add blog", error: error.message });
  }
});

// API to edit a blog
router.put("/edit/:id", upload.single("Anh"), async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Incoming newBlog data:", req.body.newBlog);
    const updatedBlog = JSON.parse(req.body.newBlog); // Make sure this is correct

    const updateData = {
      TenBlog: updatedBlog.TenBlog,
      LuotXem: updatedBlog.LuotXem,
    };

    if (req.file) {
      updateData.Anh = `/images/blog/${req.file.filename}`;
    }

    const db = await connectDb();
    const blogCollection = db.collection("blog");
    
    const result = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog: updateData });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog", error: error });
  }
});

// Delete blog by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const { id } = req.params;

    const result = await db
      .collection("blog")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;