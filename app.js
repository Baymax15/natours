const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!' });
});

app.post('/', (req, res) => {
  res.json({
    message: `We are actually not handling the data posted yet...
but we will accept your request anyways for now`,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
