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

// const v3adminRouter = require("./v3/adminRoutes");
const v3reviewRouter = require("./v3/reviewRoutes");
const v3websiteRouter = require("./v3/websiteRoutes");
const v3userRouter = require("./v3/userRoutes");
const v3authRouter = require("./v3/authRoutes");
const v3imageRouter = require("./v3/imageRoutes");

const jwt = require("jsonwebtoken");

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

  app.use("/api/v2/users", authenticateToken, v2userRouter);
  app.use("/api/v2/admins", authenticateToken, v2adminRouter);
  app.use("/api/v2/reviews", authenticateToken, v2reviewRouter);
  app.use("/api/v2/websites", authenticateToken, v2websiteRouter);
  app.use("/api/v2", v2authRouter);
  app.use("/api/v2", v2imageRouter);

  app.use("/api/v3/users", authenticateToken, v3userRouter);
  //   app.use("/api/v3/admins", authenticateToken, v3adminRouter);
  app.use("/api/v3/reviews", authenticateToken, v3reviewRouter);
  app.use("/api/v3/websites", authenticateToken, v3websiteRouter);
  app.use("/api/v3", v3authRouter);
  app.use("/api/v3", v3imageRouter);

  app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "access",
      (err, user) => {
        if (err)
          return res
            .status(403)
            .json({ message: "You do not have access to view this resource" });
        req.user = user;
        next();
      }
    );
  } else {
    res.status(401).json({
      message: "Please provide an access token to view this resource ",
    });
  }
};

module.exports = route;
