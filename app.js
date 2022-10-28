const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const { promisify } = require('util');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Route Handlers
const toursFilename = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilename));

const getTour = (req, res) => {
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
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
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
};

// TODO: implement updateTour method
const updateTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'This route is not yet defined',
    },
  });
};

// TODO: implement deleteTour method
const deleteTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'This route is not yet defined',
    },
  });
};

// TODO: implement getALlusers method
const getAllusers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// TODO: implement createUser method
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// TODO: implement getUser method
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// TODO: implement updateUser method
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// TODO: implement deleteUser method
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// Routes
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users')
  .get(getAllusers)
  .post(createUser);

app.route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Listener
const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
