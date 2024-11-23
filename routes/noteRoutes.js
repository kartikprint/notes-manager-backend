import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/posts', createNote);
router.put('/posts/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;

