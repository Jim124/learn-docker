import express from 'express';

const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello from multistage builds');
});

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
