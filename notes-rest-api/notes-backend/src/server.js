import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();
app.use(bodyParser.json());

// connect to mongodb
await mongoose.connect(process.env.MONGODB_URL);

app.get('/api/notes', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello from notes from development environment test' });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
