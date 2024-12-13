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
// API để lấy danh sách phim theo danh mục
router.get("/danhmuc/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const movieCollection = db.collection("phim");

    // Lấy id danh mục từ tham số
    const categoryId = parseInt(req.params.id, 10);

    // Tìm kiếm phim theo IdDanhMuc
    const movies = await movieCollection.find({ IdDanhMuc: categoryId }).toArray();

    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ message: "No movies found for this category." });
    }
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to get the list of products
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const theloaiCollection = db.collection("theloai");
    const theloai = await theloaiCollection.find().toArray();

    if (theloai.length > 0) {
      res.status(200).json(theloai);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to add a new event
router.post("/add", upload.single('Anh'), async (req, res) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection("theloai");

    // Retrieve the last inserted document to get the highest ID
    const lastCategory = await categoryCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastCategory.length > 0 ? lastCategory[0].id + 1 : 1; // Start from 1 if no entries exist

    // Create new event object
    const newCategory = {
      _id: new ObjectId(), // New ObjectId for MongoDB
      id: newId,
      Ten: req.body.Ten,
    };

    // Insert new event
    await categoryCollection.insertOne(newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category", error: error.message });
  }
});

// API to edit a category
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Log the entire body to see incoming data
    console.log("Incoming category data:", req.body);

    // Destructure the data directly from the body
    const { TenTheLoai } = req.body; // Change this based on your field names

    // Specify the fields to update
    const updateData = {
      Ten: TenTheLoai, // Use the correct field name here
    };

    const db = await connectDb();
    const categoryCollection = db.collection("theloai");

    // Update the document with the specified ID
    const result = await categoryCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory: updateData });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category", error: error.message });
  }
});


// Delete blog by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const { id } = req.params;

    const result = await db
      .collection("theloai")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;