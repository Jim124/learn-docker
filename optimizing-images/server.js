import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello from optimizing images');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
