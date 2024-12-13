var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, (file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  }
});


// Fetch all suatchieu
router.get("/", async (req, res) => {
    try {
      const db = await connectDb();
      const suatchieuCollection = db.collection("loaive");
      const suatchieu = await suatchieuCollection.find().toArray();
  
      if (suatchieu.length > 0) {
        res.status(200).json(suatchieu);
      } else {
        res.status(404).json({ message: "No suatchieu found" });
      }
    } catch (error) {
      console.error("Error fetching suatchieu:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  module.exports = router;