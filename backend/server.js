/* eslint-disable no-unused-vars */
const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Unhandled exception 💥 Shutting down.");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<USER>",
  process.env.DATABASE_USER
).replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection established successfully.");
  })
  .catch((err) => {
    console.log(err.message);
  });

// const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`); // eslint-disable-line
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection 💥 Shutting down.");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
