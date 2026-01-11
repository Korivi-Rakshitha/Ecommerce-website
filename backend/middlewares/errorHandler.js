const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

module.exports = { errorHandler, notFoundHandler };
