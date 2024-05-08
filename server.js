import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import WebhookRoute from "./WEBHOOK/WebhookRoute";
const { setTimeout, setInterval } = require("timers");

dotenv.config();
const app = express();
const server = http.createServer(app);
let port = process.env.PORT_SERVER;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
WebhookRoute(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on the port " + port);
  }
});
