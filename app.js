const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models");

const usersRouter = require('./routes/user.routes');
const coursesRouter = require('./routes/course.routes');
const path = require('path');
const corsOptions = { origin: "http://localhost:8081" };
app.use(cors(corsOptions));

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads ')));

// Routers
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

// Sync database
db.sequelize.sync({alter: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message,
    httpStatusText: err.httpStatusText || "Internal Server Error",
  });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
