const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT, MONGODB_URL } = require("./helpers/constants");
const bookRouter = require("./book/book.router");

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    await this.initDbConnection();
    this.initMiddleware();
    this.initRoute();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  initRoute() {
    this.server.use("/book", bookRouter);
  }

  async initDbConnection() {
    await mongoose.connect(
      MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        err ? console.error(err) : console.log("database connected");
      }
    );
  }

  startListening() {
    return this.server.listen(PORT, (err) => {
      err
        ? console.error("server listening error", err)
        : console.log("server is listening port", PORT);
    });
  }
}

module.exports = new Server();
