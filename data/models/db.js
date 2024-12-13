const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://screntime12:Y3PO2213Sq4kcmlM@cluster0.zv8zx.mongodb.net/';
const dbName = 'Ticker_Movie';

async function connectDb() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Kết nối thành công đến server MongoDB');
        const db = client.db(dbName);
        // await db.createCollection("counters");
        return db;
    } catch (err) {
        console.error('Không thể kết nối đến MongoDB', err);
        throw err;
    }
}

module.exports = connectDb;
