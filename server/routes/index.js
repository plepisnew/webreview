const adminRouter = require("./adminRoutes");
const reviewRouter = require("./reviewRoutes");
const websiteRouter = require("./websiteRoutes");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");
const imageRouter = require("./imageRoutes");

const route = (app) => {
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
  app.use("/api", imageRouter);

  app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
};

module.exports = route;
