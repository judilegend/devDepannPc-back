"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketServer = void 0;
const authMiddleware_1 = require("../middleware/authMiddleware");
const message_1 = __importDefault(require("../models/message"));
const groupMessage_1 = require("../models/groupMessage");
const user_1 = __importDefault(require("../models/user"));
const setupSocketServer = (io) => {
    io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                throw new Error("Authentication error");
            }
            const decoded = yield (0, authMiddleware_1.verifyToken)(token);
            socket.data.userId = decoded.id;
            next();
        }
        catch (error) {
            next(new Error("Authentication error"));
        }
    }));
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        console.log(`User ${userId} connected`);
        // Join personal room
        socket.join(`user:${userId}`);
        // Handle direct messages
        socket.on("direct_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const message = yield message_1.default.create({
                    senderId: userId,
                    receiverId: data.receiverId,
                    content: data.content,
                });
                io.to(`user:${userId}`)
                    .to(`user:${data.receiverId}`)
                    .emit("new_message", message);
            }
            catch (error) {
                socket.emit("error", { message: "Failed to send message" });
            }
        }));
        // Group chat functionality
        socket.on("join_room", (roomId) => {
            socket.join(`room:${roomId}`);
            console.log(`User ${userId} joined room ${roomId}`);
        });
        socket.on("leave_room", (roomId) => {
            socket.leave(`room:${roomId}`);
            console.log(`User ${userId} left room ${roomId}`);
        });
        socket.on("group_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const message = yield groupMessage_1.GroupMessage.create({
                    room_id: data.roomId,
                    sender_id: userId,
                    content: data.content,
                });
                const messageWithSender = yield groupMessage_1.GroupMessage.findByPk(message.id, {
                    include: [
                        { model: user_1.default, as: "sender", attributes: ["id", "username"] },
                    ],
                });
                io.to(`room:${data.roomId}`).emit("new_group_message", messageWithSender);
            }
            catch (error) {
                socket.emit("error", { message: "Failed to send group message" });
            }
        }));
        // Add notification acknowledgment handler
        socket.on("notification_read", (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
            // Handle notification read status
            console.log(`Notification ${notificationId} read by user ${userId}`);
        }));
        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
        });
    });
};
exports.setupSocketServer = setupSocketServer;
