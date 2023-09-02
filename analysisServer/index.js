const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
var path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const helmet = require('helmet');

// ROUTES
const itemRoutes = require('./routes/Item');
const corsOptions = require('./config/corsOption');
const credentials = require('./middleware/credentials');

function makeApp(database) {
  dotenv.config();
  const app = express();
  app.use(credentials);
  app.use(cors(corsOptions));
  // app.use(cors());
  app.use(express.json());
  // log all requests to access.log
  app.use(
    morgan('common', {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
    })
  );
  app.use(express.urlencoded({ limit: '30mb', extended: true }));
  app.use(helmet());

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  app.use(xssClean());
  app.use(mongoSanitize());
  app.use(compression());

  //ROUTES
  app.use('/api/analysis/item', itemRoutes);

  app.use('/api/analysis', (req, res) => {
    res.status(200).json({ message: 'Hello' });
  });
  app.use('*', (req, res) => {
    res.status(200).json({ message: 'Hello' });
  });

  //MONGOSSE SETUP
  database.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database.set('strictQuery', true);
  console.log('Connected to Database');
  return app;
}

module.exports = {
  makeApp: makeApp,
};
