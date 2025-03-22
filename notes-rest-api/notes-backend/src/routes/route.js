import express from 'express';
import Note from '../models/note.js';
import { isValid } from '../middleware/valid.js';

const noteRouter = express.Router();
noteRouter.get('/', async (req, res) => {
  const notes = await Note.find();
  return res.status(200).json({ data: notes });
});

noteRouter.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: `'name' or 'content ' are required` });
  }
  try {
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json({ data: note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

noteRouter.get('/:id', isValid, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'note not found ' });
    }
    res.status(200).json({ data: note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

noteRouter.put('/:id', isValid, async (req, res) => {
  const { id } = req.params;

  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ error: `'title' and 'content' are required` });
  }
  try {
    await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json({ message: 'update successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

noteRouter.delete('/:id', isValid, async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default noteRouter;
