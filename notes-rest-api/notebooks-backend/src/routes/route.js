import express from 'express';
import Notebook from '../models/notebook.js';
import { isValid } from '../middleware/valid.js';
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

notebookRouter.get('/:id', isValid, async (req, res) => {
  const { id } = req.params;

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

notebookRouter.put('/:id', isValid, async (req, res) => {
  const { id } = req.params;

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

notebookRouter.delete('/:id', isValid, async (req, res) => {
  const { id } = req.params;

  try {
    await Notebook.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default notebookRouter;
