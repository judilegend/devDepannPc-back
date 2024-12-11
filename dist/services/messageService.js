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
const sequelize_1 = require("sequelize");
const message_1 = __importDefault(require("../models/message"));
const piece_jointe_1 = __importDefault(require("../models/piece_jointe"));
const user_1 = __importDefault(require("../models/user"));
const server_1 = require("../server");
const database_1 = __importDefault(require("../config/database"));
class MessageService {
    createDirectMessage(senderId, receiverId, content, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_1.default.create({
                sender_id: senderId,
                receiver_id: receiverId,
                content,
            });
            if (file) {
                yield piece_jointe_1.default.create({
                    messageId: message.id,
                    filename: file.filename,
                    originalName: file.originalname,
                    path: `/files/${file.filename}`,
                    mimetype: file.mimetype,
                    size: file.size,
                });
            }
            const messageWithDetails = yield message_1.default.findByPk(message.id, {
                include: [
                    { model: user_1.default, as: "sender", attributes: ["id", "username"] },
                    { model: user_1.default, as: "receiver", attributes: ["id", "username"] },
                    { model: piece_jointe_1.default, as: "attachments" },
                ],
            });
            server_1.io.to(`user:${senderId}`)
                .to(`user:${receiverId}`)
                .emit("new_message", messageWithDetails);
            return messageWithDetails;
        });
    }
    // async getUnreadMessagesCount(userId: number) {
    //   const count = await DirectMessage.count({
    //     where: {
    //       receiver_id: userId,
    //       read: false,
    //     },
    //   });
    //   return count;
    // }
    // async markMessagesAsRead(senderId: number, receiverId: number) {
    //   await DirectMessage.update(
    //     { read: true },
    //     {
    //       where: {
    //         sender_id: senderId,
    //         receiver_id: receiverId,
    //         read: false,
    //       },
    //     }
    //   );
    // }
    getConversation(userId1, userId2) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield message_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { sender_id: userId1, receiver_id: userId2 },
                        { sender_id: userId2, receiver_id: userId1 },
                    ],
                },
                include: [
                    { model: user_1.default, as: "sender", attributes: ["id", "username"] },
                    { model: user_1.default, as: "receiver", attributes: ["id", "username"] },
                    { model: piece_jointe_1.default, as: "attachments" },
                ],
                order: [["created_at", "ASC"]],
            });
            return messages;
        });
    }
    getUnreadMessagesCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unreadCounts = yield message_1.default.findAll({
                attributes: [
                    "sender_id",
                    [database_1.default.fn("COUNT", database_1.default.col("id")), "count"],
                ],
                where: {
                    receiver_id: userId,
                    read: false,
                },
                group: ["sender_id"],
            });
            const countsMap = {};
            unreadCounts.forEach((result) => {
                countsMap[result.sender_id] = parseInt(result.getDataValue("count"));
            });
            return countsMap;
        });
    }
    markMessagesAsRead(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message_1.default.update({ read: true }, {
                where: {
                    sender_id: senderId,
                    receiver_id: receiverId,
                    read: false,
                },
            });
            server_1.io.to(`user:${senderId}`).to(`user:${receiverId}`).emit("messages_read");
        });
    }
}
exports.default = new MessageService();
