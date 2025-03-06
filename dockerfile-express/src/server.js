import express from 'express';
import bodyParser from 'body-parser';

const users = [];
const app = express();
app.use(bodyParser.json());

const port = 3000;
app.get('/', (req, res) => {
  res.send('hello,world');
});

// register user
app.post('/users', (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).send('Missing userId');
  }
  if (users.includes(userId)) {
    return res.status(400).send('userid already exists.');
  }
  users.push(userId);
  return res.status(201).send('user registered');
});

// get all users
app.get('/users', (req, res) => {
  res.json({ users });
});

app.listen(port, () => {
  console.log('server is running');
});
