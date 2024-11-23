import connectDB from '../config/db.js';
import { MongoClient, ObjectId } from 'mongodb';

export const getNotes = async (req, res) => {
  try {
    const db = await connectDB();
    const notes = await db.collection('notes').find({}).toArray(); // Fetch all notes
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const note = {
      title,
      description,
      category,
      createdAt: new Date(),
    };

    const db = await connectDB();
    const result = await db.collection('notes').insertOne(note);
    res.status(201).json({ message: 'Note created successfully', note });

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating note' });
  }
};


export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  try {
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connectDB();
    const result = await db.collection('notes').updateOne(
      { _id: new MongoClient.ObjectID(id) },
      { $set: { title, description, category, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully', note: { title, description, category } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating note' });
  }
};


export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    
    // Use ObjectId to convert string id to MongoDB ObjectId
    const result = await db.collection('notes').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting note' });
  }
};
