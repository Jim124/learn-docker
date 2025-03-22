import mongoose from 'mongoose';

export const isValid = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: `id is required` });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'id is invalid ' });
  }
  next();
};
