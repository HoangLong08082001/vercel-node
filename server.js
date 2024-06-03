const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const useragent = require("useragent");
const WebSocket = require('ws');
const logger = require("./middleware/logger.js");

import CollaboratorRoute from "./API/Collaborator/CollaboratorRoute.js";
import TeamRoutes from "./API/Team/TeamRoutes.js";
import "./config/database.js";
import ViewRoutes from "./routes-views/routers.js";
import WebhookRoute from "./WEBHOOK/WebhookRoute.js";
import EmployeeRoutes from "./API/Employee/EmployeeRoutes.js";
import DepartmentRoutes from "./API/Department/DepartmentRoutes.js";
import CampaignRoutes from "./API/Campaign/CampaignRoutes.js";
const path = require("path");

dotenv.config();
const app = express();
const server = http.createServer(app); // Tạo server trước khi tạo WebSocket server
const wss = new WebSocket.Server({ server }); // WebSocket server

const port = process.env.PORT_SERVER || 4000;

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

const arrayLog = [];

app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const agent = useragent.parse(req.headers["user-agent"]);
  const os = agent.os.toString();

  const logMessage = `Request: ${req.method} ${req.url} from IP: ${ip}, OS: ${os}`;
  logger.info(logMessage);

  arrayLog.push(logMessage);

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ log: logMessage }));
    }
  });

  next();
});

wss.on('connection', ws => {
  console.log('Client connected');
  arrayLog.forEach(log => {
    ws.send(JSON.stringify({ log }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

WebhookRoute(app);
CollaboratorRoute(app);
TeamRoutes(app);
ViewRoutes(app);
EmployeeRoutes(app);
DepartmentRoutes(app);
CampaignRoutes(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is running on the port " + port);
  }
});
