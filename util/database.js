const dotenv = require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Connection URL
const client = new MongoClient(`${process.env.MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db;

const mongoConnect = async (callback) => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db();
    callback();
    // the following code examples can be pasted here...
}

const getDb = () => {
    // console.log(db);
    if (db) return db;
    throw 'no database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.ObjectId = ObjectId;