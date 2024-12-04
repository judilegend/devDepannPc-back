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
const messageService_1 = __importDefault(require("../services/messageService"));
class MessageController {
    sendDirectMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { receiverId, content } = req.body;
                const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!senderId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const message = yield messageService_1.default.createDirectMessage(parseInt(senderId), parseInt(receiverId), content, req.file);
                res.status(201).json(message);
            }
            catch (error) {
                console.error("Error sending message:", error);
                res.status(500).json({ error: "Failed to send message" });
            }
        });
    }
    getConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { otherUserId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const messages = yield messageService_1.default.getConversation(parseInt(userId), parseInt(otherUserId));
                res.status(200).json(messages || []);
            }
            catch (error) {
                console.error("Error fetching conversation:", error);
                res.status(500).json({ error: "Failed to fetch conversation" });
            }
        });
    }
    getUnreadMessagesCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const unreadCounts = yield messageService_1.default.getUnreadMessagesCount(parseInt(userId));
                res.status(200).json(unreadCounts);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch unread counts" });
            }
        });
    }
    markMessagesAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { senderId } = req.params;
                const receiverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!receiverId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                yield messageService_1.default.markMessagesAsRead(parseInt(senderId), parseInt(receiverId));
                res.status(200).json({ message: "Messages marked as read" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to mark messages as read" });
            }
        });
    }
}
exports.default = new MessageController();
