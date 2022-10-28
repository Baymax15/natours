const fs = require('fs');
const { promisify } = require('util');

const toursFilename = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilename));

module.exports.getTour = (req, res) => {
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

module.exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

module.exports.createTour = (req, res) => {
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
module.exports.updateTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'This route is not yet defined',
    },
  });
};

// TODO: implement deleteTour method
module.exports.deleteTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: 'This route is not yet defined',
    },
  });
};
