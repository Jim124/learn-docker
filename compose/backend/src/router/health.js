import express from 'express';
const healthRouter = express.Router();
healthRouter.get('/', (req, res) => {
  res.status(200).send('docker compose command is running up now...');
});

export default healthRouter;
