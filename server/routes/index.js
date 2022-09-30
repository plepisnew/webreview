const v1adminRouter = require("./v1/adminRoutes");
const v1reviewRouter = require("./v1/reviewRoutes");
const v1websiteRouter = require("./v1/websiteRoutes");
const v1userRouter = require("./v1/userRoutes");
const v1authRouter = require("./v1/authRoutes");
const v1imageRouter = require("./v1/imageRoutes");

const v2adminRouter = require("./v2/adminRoutes");
const v2reviewRouter = require("./v2/reviewRoutes");
const v2websiteRouter = require("./v2/websiteRoutes");
const v2userRouter = require("./v2/userRoutes");
const v2authRouter = require("./v2/authRoutes");
const v2imageRouter = require("./v2/imageRoutes");

const route = (app) => {
  app.get("/api", (req, res) => {
    res.json({
      message: "Welcome to your DIT342 backend ExpressJS project!",
    });
  });

  app.use("/api/v1/users", v1userRouter);
  app.use("/api/v1/admins", v1adminRouter);
  app.use("/api/v1/reviews", v1reviewRouter);
  app.use("/api/v1/websites", v1websiteRouter);
  app.use("/api/v1", v1authRouter);
  app.use("/api/v1", v1imageRouter);

  app.use("/api/v2/users", v2userRouter);
  app.use("/api/v2/admins", v2adminRouter);
  app.use("/api/v2/reviews", v2reviewRouter);
  app.use("/api/v2/websites", v2websiteRouter);
  app.use("/api/v2", v2authRouter);
  app.use("/api/v2", v2imageRouter);

  app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
};

module.exports = route;
