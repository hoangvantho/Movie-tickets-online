var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { getUserFromToken } = require('./middleware');
const connectDb = require('../models/db');

// ---------------------------Products--------------------------------//
// GET /api/comments?movieId=:movieId
router.get("/", async (req, res) => {
    try {
      const movieId = req.query.movieId;
      const userId = req.query.userId;
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan");
  
      const query = {};
  
      if (movieId) {
        query.movieId = movieId;
      }
  
      if (userId) {
        query.userId = userId;
      }
  
      const comments = await commentsCollection.find(query).toArray();
  
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

router.get("/:movieId", async (req, res) => {
    try {
        const { movieId } = req.params;
        const db = await connectDb();
        const commentsCollection = db.collection("binhluan");
        
        const comments = await commentsCollection.find({ movieId }).toArray();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Failed to fetch comments" });
    }
});

// Thêm bình luận mới
router.post("/", getUserFromToken, async (req, res) => {
    try {
        const { user } = req;
        
        // Kiểm tra xem người dùng có đăng nhập không
        if (!user) {
            return res.status(401).json({ message: "Bạn phải đăng nhập để bình luận." });
        }
        
        const { movieId, content } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!movieId || !content) {
            return res.status(400).json({ message: "movieId và content là bắt buộc" });
        }

        const db = await connectDb();
        const commentsCollection = db.collection("binhluan");

        const newComment = {
            movieId,
            userId: String(user.userId),
            content,
            fullname: user.Ten,
            username: user.TenDangNhap,
            userImage: user.Anh,
            timestamp: new Date(),
        };

        await commentsCollection.insertOne(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Failed to add comment" });
    }
});
  
// Cập nhật bình luận
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan");
  
      const updatedComment = await commentsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { content } },
        { returnDocument: "after" }
      );
  
      res.status(200).json(updatedComment.value);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ message: "Failed to update comment" });
    }
});
  
// Xóa bình luận
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan");
  
      await commentsCollection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Failed to delete comment" });
    }
});


// const getUserFromToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
//     req.user = { _id: decoded.userId }; // Attach user ID to req.user
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// Fetches comment history based on the logged-in user's ID
router.get("/:userId", getUserFromToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectDb();
    const commentsCollection = db.collection("binhluan");
    
    const comments = await commentsCollection.find({ userId }).toArray();
    res.status(200).json(comments);
} catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
}
});


module.exports = router;
