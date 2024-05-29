const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
import CollaboratorRoute from "./API/Collaborator/CollaboratorRoute";
import TeamRoutes from "./API/Team/TeamRoutes";
import "./config/database";
import ViewRoutes from "./routes-views/routers";
import WebhookRoute from "./WEBHOOK/WebhookRoute";
const path = require("path");

const socketIO = require("socket.io");
const io = socketIO();
dotenv.config();
const app = express();
const server = http.createServer(app);
let port = process.env.PORT_SERVER || 3031;
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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

app.use(cors(corsOptions));
WebhookRoute(app);
CollaboratorRoute(app);
TeamRoutes(app);
ViewRoutes(app);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on the port " + port);
  }
});
