const fs = require('fs');
const { promisify } = require('util');

const toursFilename = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilename));

// Middleware to filter if id is valid (if it exists in route)
module.exports.checkId = (req, res, next, val) => {
  const id = Number.parseInt(val, 10);

  return tours.some((tour) => tour.id === id)
    ? next()
    : res.status(404).json({ status: 'fail', data: { message: 'Invalid Id' } });
};

// Middleware to filter out bad post requests
// To filter out requests which does not have required fields
module.exports.checkPostBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      data: { message: 'Missing one of required fields (name, duration, price)' },
    });
  }
  return next();
};

module.exports.getTour = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
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
