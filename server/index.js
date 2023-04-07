const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// ROUTES
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/category');
const itemRoutes = require('./routes/item');

function makeApp(database) {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  //ROUTES
  app.use('/api/admin', adminRoutes);
  app.use('/api/category', categoryRoutes);
  app.use('/api/item', itemRoutes);

  app.use('/', (req, res) => {
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
