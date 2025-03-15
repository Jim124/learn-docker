import express from 'express';
import KeyValue from '../models/keyValue.js';
const storeRouter = express.Router();

storeRouter.post('/', async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: 'Both key and value are required' });
  }
  try {
    const keyValueExisted = await KeyValue.findOne({ key });
    if (keyValueExisted) {
      return res.status(400).json({ message: 'key exited' });
    }
    const keyValue = new KeyValue({ key, value });
    await keyValue.save();
    return res.status(201).json({ message: 'create key-value successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
storeRouter.get('/:key', async (req, res) => {
  const { key } = req.params;
  if (!key) return res.status(400).json({ message: 'invalid request' });
  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) return res.status(400).json({ error: 'could not find ' });
    return res.status(200).json({ message: 'successfully', data: keyValue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

storeRouter.put('/:key', async (req, res) => {
  const { key } = req.params;
  if (!key) return res.status(400).json({ message: 'invalid request' });
  const { value } = req.body;
  if (!value) return res.status(400).json({ message: 'invalid request' });
  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) return res.status(400).json({ error: 'could not find ' });
    const updatekeyValue = await KeyValue.findOneAndUpdate(
      { key },
      { value },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'update successfully', data: updatekeyValue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

storeRouter.delete('/:key', async (req, res) => {
  const { key } = req.params;
  if (!key) return res.status(400).json({ message: 'invalid request' });
  try {
    const keyValue = await KeyValue.findOne({ key });
    if (!keyValue) return res.status(400).json({ error: 'could not find ' });
    await KeyValue.findOneAndDelete({ key });
    return res.status(200).json({ message: 'delete successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default storeRouter;
