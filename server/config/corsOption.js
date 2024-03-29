const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith('.localhost:4000') ||
      origin.endsWith('.myshopx.net') ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
