const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
// const helloRouter = require("./routes/helloRouter.js");

// const AppError = require("./utils/appError");

const app = express();
app.use(express.json());

app.use(cors());

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

// app.use(mongoSanitize());

app.use(compression());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/swap", require("./routes/swapRequest.routes"));
module.exports = app;
