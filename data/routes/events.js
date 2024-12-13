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

// Fetch all events
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const eventCollection = db.collection("sukien");
    const events = await eventCollection.find().toArray();

    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: "No events found" });
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch event by _ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const event = await db.collection('events').findOne({ _id: ObjectId(req.params.id) });

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// API to add a new event
router.post("/add", upload.single('Anh'), async (req, res) => {
  try {
    const newEvent = JSON.parse(req.body.newEvent);
    let Anh = req.file ? `/images/event/${req.file.filename}` : ""; 

    const eventId = new ObjectId(); 

    const eventData = {
      _id: eventId,
      id: eventId.toString(),
      Ten: newEvent.Ten,
      NoiDung: newEvent.NoiDung,
      Anh: Anh,
      NgayBatDau: newEvent.NgayBatDau,
      NgayKetThuc: newEvent.NgayKetThuc,
      Luuy: newEvent.Luuy,
      DieuKien: newEvent.DieuKien,
      Giam: newEvent.Giam,
    };

    const db = await connectDb();
    const eventCollection = db.collection("sukien");
    await eventCollection.insertOne(eventData);

    res.status(201).json(eventData);
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event", error: error.message });
  }
});

// API to edit an event
router.put("/edit/:id", upload.single('Anh'), async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEvent = JSON.parse(req.body.newEvent);
    const updateData = {
      Ten: updatedEvent.Ten,
      NoiDung: updatedEvent.NoiDung,
      NgayBatDau: updatedEvent.NgayBatDau,
      NgayKetThuc: updatedEvent.NgayKetThuc,
      Luuy: updatedEvent.Luuy,
      DieuKien: updatedEvent.DieuKien,
      Giam: updatedEvent.Giam,
    };

    if (req.file) {
      updateData.Anh = `/images/event/${req.file.filename}`;
    }

    const db = await connectDb();
    const eventCollection = db.collection("sukien");
    const result = await eventCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", updatedEvent: updateData });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event", error: error });
  }
});

// Delete event by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const { id } = req.params;

    const result = await db.collection('sukien').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/discount/:eventName", async (req, res) => {
  const { eventName } = req.params;  // Lấy giá trị eventName từ URL

  try {
    const db = await connectDb();
    const eventCollection = db.collection("sukien");

    // Tìm sự kiện theo tên Ten (trong cơ sở dữ liệu) và kiểm tra trường Giam có giá trị
    const event = await eventCollection.findOne({
      Ten: eventName, // Tìm sự kiện theo tên Ten
      Giam: { $exists: true, $ne: null } // Kiểm tra trường Giam tồn tại và khác null
    });

    if (event && event.Ten && event.Giam) {
      // Trả về mã giảm giá (Ten) và giá trị giảm giá (Giam) nếu có
      res.status(200).json({
        MaGiamGia: event.Ten, // Tên sự kiện làm mã giảm giá
        discountPercent: event.Giam // Giá trị giảm giá (Giam)
      });
    } else {
      res.status(404).json({ message: "Event not found or no discount available" });
    }
  } catch (error) {
    console.error("Error fetching discount code:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;