const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");

const adminRouter = require("./routes/adminRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const websiteRouter = require("./routes/websiteRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const addBaseData = require("./utils/addBaseData");

/* Connects to MongoDB database */
const connectDatabase = () => {
  const mongoURI =
    process.env.MONGODB_URI ||
    "mongodb+srv://root:admin@cluster0.wzi4h06.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log(
        `${
          err
            ? "Can't connect to database"
            : "Successfully connceted to database"
        } ${mongoURI}`
      );
      // addBaseData();
    }
  );
};

/* Applies middleware required for handling requests and responses */
const applyInitialMiddleware = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.options("*", cors());
  app.use(cors());
};

/* Applies middleware after route handlers are mounted */
const applyMiddleware = () => {
  app.use(history());
  const root = path.normalize(__dirname + "/..");
  const client = path.join(root, "client", "dist");
  app.use(express.static(client));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err.stack);
    const err_res = {
      message: err.message,
      error: {},
    };
    if (env === "development") {
      err_res["error"] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
  });
};

/* Attaches handlers to routes */
const mountRoutes = () => {
  app.get("/api", (req, res) => {
    res.json({
      message: "Welcome to your DIT342 backend ExpressJS project!",
    });
  });

  app.use("/api/users", userRouter);
  app.use("/api/admins", adminRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/websites", websiteRouter);
  app.use("/api", authRouter);

  app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
};

/* Starts server */
const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
  });
};

const app = express();
const env = app.get("env");

connectDatabase();
applyInitialMiddleware();
mountRoutes();
applyMiddleware();
startServer();

module.exports = app;
