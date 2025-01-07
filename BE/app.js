var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://frontend:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add this before your routes
const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    port: dbConfig.development.port,
    dialect: dbConfig.development.dialect,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
