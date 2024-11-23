import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://kartik:kartik@cluster0.4gsksvu.mongodb.net/mynote?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string
const dbName = 'mynote'; // Replace with your database name
let db;

const connectDB = async () => {
  if (!db) {
    try {
      const client = new MongoClient(url);
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(dbName);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Exit the process if unable to connect
    }
  }
  return db;
};

export default connectDB;
