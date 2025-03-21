import express from 'express';
import mongoose from 'mongoose';
import Notebook from '../models/notebook.js';
const notebookRouter = express.Router();

notebookRouter.get('/', async (req, res) => {
  const notebooks = await Notebook.find();
  return res.status(200).json({ data: notebooks });
});

notebookRouter.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: `'name' is required` });
  }
  try {
    const notebook = new Notebook({ name, description });
    await notebook.save();
    res.status(201).json({ data: notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

notebookRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: `id is required` });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'notebook not found ' });
  }
  try {
    const notebook = await Notebook.findById(id);
    if (!notebook) {
      return res.status(404).json({ error: 'notebook not found ' });
    }
    res.status(200).json({ data: notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

notebookRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: `id is required` });
  }
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: `'name' is required` });
  }
  try {
    await Notebook.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json({ message: 'update successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

notebookRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: `id is required` });
  }
  try {
    await Notebook.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default notebookRouter;
