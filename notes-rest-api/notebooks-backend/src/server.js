import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import notebookRouter from './routes/route.js';
const app = express();
app.use(bodyParser.json());

// connection mongodb
await mongoose.connect(process.env.MONGODB_URL);

app.use('/api/notebooks', notebookRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
