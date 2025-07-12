const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
// const helloRouter = require("./routes/helloRouter.js");

const AppError = require("./utils/appError");

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 10000,
  message: "Too many requests from this IP. Please try again later.",
});

app.use("/api", limiter);

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());

app.use(compression());

// Routes

// app.use("/api/v1/hello", helloRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.url} on the server.`, 404);
  next(err);
});

module.exports = app;
