"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
// import { sequelize } from "./models/index";
const database_1 = __importDefault(require("./config/database"));
const socket_1 = require("./socket");
const path_1 = __importDefault(require("path"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const activiteRoutes_1 = __importDefault(require("./routes/activiteRoutes"));
const pomodoroRoutes_1 = __importDefault(require("./routes/pomodoroRoutes"));
const workpackageRoutes_1 = __importDefault(require("./routes/workpackageRoutes"));
const sprintRoutes_1 = __importDefault(require("./routes/sprintRoutes"));
const tacheRoutes_1 = __importDefault(require("./routes/tacheRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const pieceJointeRoutes_1 = __importDefault(require("./routes/pieceJointeRoutes"));
const groupMessageRoutes_1 = __importDefault(require("./routes/groupMessageRoutes"));
//web push
const webPushUtil_1 = require("./utils/webPushUtil");
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const notificationService_1 = __importDefault(require("./services/notificationService"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "X-Requested-With",
        "Accept",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
    ],
    exposedHeaders: ["set-cookie"],
}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Authorization"],
    },
});
exports.io = io;
//initializeWebPush();
(0, webPushUtil_1.initializeWebPush)();
app.use(express_1.default.json());
// app.use("/images", express.static(path.join(__dirname, "./uploads/images")));
// app.use("/files", express.static(path.join(__dirname, "./uploads/files")));
app.use("/files", express_1.default.static(path_1.default.join(__dirname, "./uploads/files")));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/tasks", tacheRoutes_1.default);
app.use("/api/workpackages", workpackageRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/sprints", sprintRoutes_1.default);
app.use("/api/activities", activiteRoutes_1.default);
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/pomodoro", pomodoroRoutes_1.default);
app.use("/api/piece-jointes", pieceJointeRoutes_1.default);
app.use("/api/groups", groupMessageRoutes_1.default);
//call web push rouutes
app.use("/api/notifications", notificationRoutes_1.default);
// Pass socket.io instance to notification service
notificationService_1.default.setSocketIO(io);
(0, socket_1.setupSocketServer)(io);
const PORT = process.env.PORT || 5000;
database_1.default.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`WebSocket server initialized`);
    });
});
