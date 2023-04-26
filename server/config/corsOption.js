const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('Cors Error ', origin);
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
