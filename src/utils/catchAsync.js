//function so that our server doesnt crash ,somethimes it even by passes the try catch block ,implemneted pm2 for load balancing etc..

function catchAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}

module.exports = catchAsync;
