const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// ROUTES
const adminRoutes = require("./routes/admin");

function makeApp(database) {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  //   // Set up rate limiter: maximum of twenty requests per minute
  // var RateLimit = require("express-rate-limit");
  // var limiter = RateLimit({
  //   windowMs: 1 * 60 * 1000, // 1 minute
  //   max: 20,
  // });
  // // Apply rate limiter to all requests
  // app.use(limiter);

  //ROUTES
  app.use("/admin", adminRoutes);
  app.use("/", (req, res) => {
    res.status(200).json({ message: "Hello" });
  });

  //MONGOSSE SETUP
  database.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database.set("strictQuery", true);
  return app;
}

module.exports = {
  makeApp: makeApp,
};
