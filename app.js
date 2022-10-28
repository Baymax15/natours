const fs = require('fs');
const express = require('express');
const { promisify } = require('util');

const app = express();
app.use(express.json());

const toursFilename = `${__dirname}/dev-data/data/tours-simple.json`;
/**
 * @type {Array}
 */
const tours = JSON.parse(fs.readFileSync(toursFilename));

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'error',
      data: {
        message: 'Invalid Id',
      },
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  promisify(fs.writeFile)(toursFilename, JSON.stringify(tours))
    .then(() => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: {
          error: err,
        },
      });
    });
});

// TODO: implement patch method
app.patch('/api/v1/tours/:id', (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'Method not implemented yet',
    },
  });
});

// TODO: implement delete method
app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'Method not implemented yet',
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
