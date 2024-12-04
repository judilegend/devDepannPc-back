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
const groupMessageService_1 = __importDefault(require("../services/groupMessageService"));
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("../models/user"));
const groupMessage_1 = require("../models/groupMessage");
class GroupMessageController {
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { name, members } = req.body;
                // Validation
                if (!name || !members || !Array.isArray(members)) {
                    return res.status(400).json({
                        error: "Invalid request body. Name and members array are required",
                    });
                }
                const createdBy = parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                // Create room and add members in a transaction
                const room = yield database_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const newRoom = yield groupMessageService_1.default.createRoom(name, createdBy);
                    if (newRoom) {
                        yield groupMessageService_1.default.addMembersToRoom(newRoom.id, [...new Set([...members, createdBy])] // Remove duplicates
                        );
                        return newRoom;
                    }
                    throw new Error("Failed to create room");
                }));
                // Return room with full details
                const roomWithDetails = yield groupMessage_1.Room.findByPk(room.id, {
                    include: [
                        {
                            model: user_1.default,
                            as: "members",
                            attributes: ["id", "username"],
                            through: { attributes: [] },
                        },
                        {
                            model: user_1.default,
                            as: "creator",
                            attributes: ["id", "username"],
                        },
                    ],
                });
                return res.status(201).json(roomWithDetails);
            }
            catch (error) {
                console.error("Create room error:", error);
                return res.status(500).json({
                    error: "Failed to create room",
                    details: process.env.NODE_ENV === "development" && error instanceof Error
                        ? error.message
                        : undefined,
                });
            }
        });
    }
    getUserRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const rooms = yield groupMessageService_1.default.getUserRooms(userId);
                res.status(200).json(rooms);
            }
            catch (error) {
                console.error("Error in getUserRooms controller:", error);
                res.status(500).json({
                    error: "Failed to fetch user rooms",
                    details: process.env.NODE_ENV === "development" && error instanceof Error
                        ? error.message
                        : undefined,
                });
            }
        });
    }
    // async getRoomDetails(req: Request, res: Response) {
    //   try {
    //     const { roomId } = req.params;
    //     const room = await groupMessageService.getRoomDetails(parseInt(roomId));
    //     res.status(200).json(room);
    //   } catch (error) {
    //     res.status(500).json({ error: "Failed to fetch room details" });
    //   }
    // }
    getRoomDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId } = req.params;
                const room = yield groupMessageService_1.default.getRoomDetails(parseInt(roomId));
                res.status(200).json(room);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch room details" });
            }
        });
    }
    sendGroupMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { roomId } = req.params;
                const { content } = req.body;
                const senderId = parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const message = yield groupMessageService_1.default.sendGroupMessage(parseInt(roomId), senderId, content, req.file);
                res.status(201).json(message);
            }
            catch (error) {
                console.error("Error sending group message:", error);
                res.status(500).json({ error: "Failed to send group message" });
            }
        });
    }
    getUnreadGroupMessagesCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const unreadCounts = yield groupMessageService_1.default.getUnreadGroupMessagesCount(userId);
                res.status(200).json(unreadCounts);
            }
            catch (error) {
                console.error("Error getting unread counts:", error);
                res.status(500).json({
                    error: "Failed to fetch unread counts",
                    details: process.env.NODE_ENV === "development" && error instanceof Error
                        ? error.message
                        : undefined,
                });
            }
        });
    }
    markGroupMessagesAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { roomId } = req.params;
                const userId = parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                yield groupMessageService_1.default.markGroupMessagesAsRead(parseInt(roomId), userId);
                res.status(200).json({ message: "Messages marked as read" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to mark messages as read" });
            }
        });
    }
    addMembersToRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId } = req.params;
                const { members } = req.body;
                yield groupMessageService_1.default.addMembersToRoom(parseInt(roomId), members);
                res.status(200).json({ message: "Members added successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to add members" });
            }
        });
    }
    getRoomMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId } = req.params;
                const messages = yield groupMessageService_1.default.getRoomMessages(parseInt(roomId));
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch room messages" });
            }
        });
    }
    removeUserFromRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId, userId } = req.params;
                yield groupMessageService_1.default.removeUserFromRoom(parseInt(roomId), parseInt(userId));
                res.status(200).json({ message: "Member removed successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to remove member" });
            }
        });
    }
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId } = req.params;
                yield groupMessageService_1.default.deleteRoom(parseInt(roomId));
                res.status(200).json({ message: "Room deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete room" });
            }
        });
    }
}
exports.default = new GroupMessageController();
