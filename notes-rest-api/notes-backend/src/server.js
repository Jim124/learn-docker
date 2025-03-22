import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noteRouter from './routes/route.js';
const app = express();
app.use(bodyParser.json());
app.use('/api/notes', noteRouter);
// connect to mongodb
await mongoose.connect(process.env.MONGODB_URL);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
