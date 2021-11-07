const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const { User } = require("./models/user");
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/rest-api-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the MongoDB !!!"))
  .catch((err) => console.log("Could not connect to the MongoDB... " + err));

app.use(cors());

app.use(express.json());

app.use("/api/users", users);

app.use("/api/auth", auth);

app.use("/api/cards", cards);

app.get("/", (req, res) => {
  res.send(new Date().toLocaleTimeString());
});

app.get("/allusers", (req, res) => {
  const users = User.find({});
  console.log(users.length);
  res.send(users[0]);
});

const port = 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));