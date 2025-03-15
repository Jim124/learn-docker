import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import healthRouter from './router/health.js';
import storeRouter from './router/store.js';

const app = express();
app.use(bodyParser.json());

await mongoose.connect(
  `mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`,
  {
    auth: {
      username: process.env.KEY_VALUE_USER,
      password: process.env.KEY_VALUE_PASSWORD,
    },
    connectTimeoutMS: 500,
  }
);

app.get('/test', (req, res) => {
  res.send('welcome to nodemon for hot reloading app.');
});
app.use('/health', healthRouter);
app.use('/store', storeRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
