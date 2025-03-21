import mongoose from 'mongoose';

const keyValueSchema = new mongoose.Schema({
  key: { type: String, require: true, unique: true },
  value: { type: String, require: true },
});

const KeyValue = mongoose.model('KeyValue', keyValueSchema);

export default KeyValue;
