import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Notebook', noteSchema);

export default Note;
