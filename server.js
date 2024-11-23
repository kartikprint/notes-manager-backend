import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes.js';
import connectDB from '../backend/config/db.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

// Connect to MongoDB
(async () => {
    try {
      await connectDB();
      console.log('Database connection successful');
    } catch (err) {
      console.error('Failed to connect to database:', err);
    }
  })();



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
