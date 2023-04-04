const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

function makeApp(database) {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  //ROUTES
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
