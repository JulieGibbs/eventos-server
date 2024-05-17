const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "eventos-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const dbConfig = require('./app/config/db_config')
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eventos application." });
});

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await new Role({ name: "user" }).save();
      await new Role({ name: "admin" }).save();
    }
  } catch (err) {
    console.error("Error initializing roles", err);
  }
}

// routes
require('./app/routes/auth_routes')(app);
require('./app/routes/user_routes')(app);
require('./app/routes/event_routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});