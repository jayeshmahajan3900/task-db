const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Set CORS options
var corsOptions = {
  origin: "http://localhost:8083", // Change this to your frontend URL if different
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database configuration and connection
const db = require("./app/models");

const dbUrl = process.env.MONGO_URI;

db.mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err.message);
    process.exit();
  });

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the task application." });
});

// Import routes
require("./app/routes/tutorial.routes")(app); // Make sure the file path is correct

// Set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
