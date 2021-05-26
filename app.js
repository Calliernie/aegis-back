const express = require("express");
const app = express();
const postRouter = require("./routes/post");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", postRouter);

// import routes
app.use("/posts", postRouter);

//connection to database
const port = process.env.DB_CONNECTION || 3000;
mongoose.connect(port, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connected");
});

//how we start listening to the server
app.listen(port, () => {
  console.log("Server started");
});
