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
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connected");
});

//how we start listening to the server
app.listen(3000, () => {
  console.log("Server started");
});
