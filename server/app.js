require('dotenv').config();

var express = require('express');

var cloudinary = require('cloudinary').v2;

var app = express();

app.use(express.json());
app.use(express.urlencoded());

// cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// upload image

app.post("/", (request, response) => {
  const data = {
    image: request.body.image,
  };

  cloudinary.uploader.upload(data.image)
  .then((result) => {
    response.status(200).send({
      message: 'upload successfully!',
      result,
    });
  })
  .catch((error) => {
    response.status(500).send({
      message: 'failure',
      error
    });
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
