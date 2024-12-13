const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://screntime12:Y3PO2213Sq4kcmlM@cluster0.zv8zx.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    // Thực hiện các thao tác với database
    const database = client.db("test"); // Thay "test" bằng tên database của bạn
    const collection = database.collection("example"); // Tạo hoặc chọn collection

    const document = { name: "MongoDB", type: "Database" };
    await collection.insertOne(document); // Insert dữ liệu

    console.log("Document inserted:", document);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Đóng kết nối
    await client.close();
  }
}

run();
