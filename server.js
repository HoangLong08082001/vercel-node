const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const useragent = require("useragent");
const morgan = require("morgan");

const cors = require("cors");
const http = require("http");
import CollaboratorRoute from "./API/Collaborator/CollaboratorRoute";
import TeamRoutes from "./API/Team/TeamRoutes";
import "./config/database";
import ViewRoutes from "./routes-views/routers";
import WebhookRoute from "./WEBHOOK/WebhookRoute";
import logger from "./middleware/logger";
import EmployeeRoutes from "./API/Employee/EmployeeRoutes";
import DepartmentRoutes from "./API/Department/DepartmentRoutes";
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

WebhookRoute(app);
CollaboratorRoute(app);
TeamRoutes(app);
ViewRoutes(app);
EmployeeRoutes(app);
DepartmentRoutes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on the port " + port);
  }
});
