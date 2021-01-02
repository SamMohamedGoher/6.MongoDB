const ErrorResponse = require(`../util/errorResponse`);

exports.errorHandler = (err, req, res, next) => {

  // console.log(err);

  // id of content is not valid
  if(err.kind === `ObjectId`) {
    const message = `content not found at id ${err.value}`;
    err = new ErrorResponse(message, 404);
  }

  // duplication error
  if(err.code === 11000) {
    const message = `this content is already exists.`;
    err = new ErrorResponse(message, 400);
  }

  // validation error
  if(err.name === `ValidationError`) {
    const message = err.message;
    err = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    errorMessage: err.message || `Eerver Error`
  });
};