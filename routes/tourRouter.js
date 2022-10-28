const fs = require('fs');
const express = require('express');
const { promisify } = require('util');

const router = express.Router();

const toursFilename = `${__dirname}/../dev-data/data/tours-simple.json`;
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

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
