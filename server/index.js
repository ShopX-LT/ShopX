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
const expressWinston = require('express-winston');
const logger = require('./middleware/logger');

// ROUTES
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/category');
const itemRoutes = require('./routes/item');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const designRoutes = require('./routes/design');
const reviewRoutes = require('./routes/review');
const corsOptions = require('./config/corsOption');
const credentials = require('./middleware/credentials');
const { sendNewVisitEmail } = require('./services/EmailService');

function makeApp(database, databaseConnectionString = process.env.PROD_MONGO_URL) {
  dotenv.config();
  const app = express();
  app.use(credentials);
  app.use(cors(corsOptions));
  // app.use(cors());
  app.use(express.json());

  // log all requests to access.log
  // Define a custom token for Morgan to access the client's IP address
  morgan.token('client-ip', function (req, res) {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  });
  app.use(
    morgan(':client-ip - - [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms', {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
    })
  );

  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      statusLevels: true,
    })
  );

  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb', extended: true }));
  app.use(xssClean());
  app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    })
  );
  app.use(compression());

  //ROUTES
  app.use('/api/admin', adminRoutes);
  app.use('/api/category', categoryRoutes);
  app.use('/api/item', itemRoutes);
  app.use('/api/order', orderRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/design', designRoutes);
  app.use('/api/review', reviewRoutes);

  app.use('/api/newvisit', async (req, res) => {
    try {
      await sendNewVisitEmail();
      res.sendStatus(200);
    } catch (error) {
      console.log('Error sending new Visit email', error);
    }
  });

  app.use('/api', (req, res) => {
    res.status(200).json();
  });
  app.use('/', (req, res) => {
    res.status(200).json();
  });

  //MONGOSSE SETUP
  database.connect(databaseConnectionString, {
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
