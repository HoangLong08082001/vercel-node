const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const useragent = require("useragent");
const morgan = require("morgan");

const cors = require("cors");
const http = require("http");
import CollaboratorRoute from "./API/Collaborator/CollaboratorRoute.js";
import TeamRoutes from "./API/Team/TeamRoutes.js";
import "./config/database.js";
import ViewRoutes from "./routes-views/routers.js";
import WebhookRoute from "./WEBHOOK/WebhookRoute.js";
const logger = require("./middleware/logger.js");
import EmployeeRoutes from "./API/Employee/EmployeeRoutes.js";
import DepartmentRoutes from "./API/Department/DepartmentRoutes.js";
import CampaignRoutes from "./API/Campaign/CampaignRoutes.js";
const path = require("path");
const socketIO = require("socket.io");
const io = socketIO();
dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
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

app.use((req, res, next) => {
  // Lấy địa chỉ IP của client
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Lấy thông tin hệ điều hành từ User-Agent
  const agent = useragent.parse(req.headers["user-agent"]);
  const os = agent.os.toString();

  // Ghi log thông tin
  logger.info(`Request: ${req.method} ${req.url} from IP: ${ip}, OS: ${os}`);
  next();
});
app.use("/", (req, res) => {
  return res.send("helo");
});
WebhookRoute(app);
CollaboratorRoute(app);
TeamRoutes(app);
ViewRoutes(app);
EmployeeRoutes(app);
DepartmentRoutes(app);
CampaignRoutes(app);

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is running on the port " + port);
  }
});
