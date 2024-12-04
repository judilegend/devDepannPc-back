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
const groupMessage_1 = require("../models/groupMessage");
const user_1 = __importDefault(require("../models/user"));
const server_1 = require("../server");
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const piece_jointe_1 = __importDefault(require("../models/piece_jointe"));
class GroupMessageService {
    // async createRoom(name: string, createdBy: number) {
    //   const room = await Room.create({
    //     name,
    //     created_by: createdBy,
    //   });
    //   const roomWithDetails = await Room.findByPk(room.id, {
    //     include: [
    //       {
    //         model: User,
    //         as: "members",
    //         attributes: ["id", "username"],
    //         through: { attributes: [] },
    //       },
    //     ],
    //   });
    //   return roomWithDetails;
    // }
    createRoom(name, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield groupMessage_1.Room.create({
                name,
                created_by: createdBy,
            });
            const roomWithDetails = yield groupMessage_1.Room.findByPk(room.id, {
                include: [
                    {
                        model: user_1.default,
                        as: "members",
                        through: { attributes: [] },
                        attributes: ["id", "username", "is_online"],
                    },
                    {
                        model: user_1.default,
                        as: "creator",
                        attributes: ["id", "username"],
                    },
                ],
            });
            // Notify all online users about the new room
            server_1.io.emit("room_created", roomWithDetails);
            return roomWithDetails;
        });
    }
    addMembersToRoom(roomId, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = userIds.map((userId) => ({
                room_id: roomId,
                user_id: userId,
            }));
            yield groupMessage_1.RoomMember.bulkCreate(members);
            const updatedRoom = yield this.getRoomDetails(roomId);
            // Notify each added member individually
            userIds.forEach((userId) => {
                server_1.io.to(`user:${userId}`).emit("added_to_room", updatedRoom);
            });
            return updatedRoom;
        });
    }
    getRoomDetails(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield groupMessage_1.Room.findByPk(roomId, {
                include: [
                    {
                        model: user_1.default,
                        as: "members",
                        through: { attributes: [] },
                        attributes: ["id", "username", "is_online"],
                    },
                    {
                        model: user_1.default,
                        as: "creator",
                        attributes: ["id", "username"],
                    },
                ],
            });
            return room;
        });
    }
    getRoomMessages(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield groupMessage_1.GroupMessage.findAll({
                where: { room_id: roomId },
                include: [
                    {
                        model: user_1.default,
                        as: "sender",
                        attributes: ["id", "username"],
                    },
                ],
                order: [["created_at", "ASC"]],
            });
            return messages;
        });
    }
    sendGroupMessage(roomId, senderId, content, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield groupMessage_1.GroupMessage.create({
                room_id: roomId,
                sender_id: senderId,
                content,
                read: false,
            });
            if (file) {
                yield piece_jointe_1.default.create({
                    groupMessageId: message.id,
                    filename: file.filename,
                    originalName: file.originalname,
                    path: `/files/${file.filename}`,
                    mimetype: file.mimetype,
                    size: file.size,
                });
            }
            const messageWithDetails = yield groupMessage_1.GroupMessage.findByPk(message.id, {
                include: [
                    {
                        model: user_1.default,
                        as: "sender",
                        attributes: ["id", "username"],
                    },
                    {
                        model: piece_jointe_1.default,
                        as: "attachments",
                    },
                ],
            });
            server_1.io.to(`room:${roomId}`).emit("new_group_message", messageWithDetails);
            return messageWithDetails;
        });
    }
    getUserRooms(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield groupMessage_1.Room.findAll({
                    include: [
                        {
                            model: user_1.default,
                            as: "members",
                            through: {
                                where: { user_id: userId },
                                attributes: [],
                            },
                            attributes: ["id", "username", "is_online"],
                        },
                        {
                            model: user_1.default,
                            as: "creator",
                            attributes: ["id", "username"],
                        },
                    ],
                });
                const roomsWithUnreadCounts = yield Promise.all(rooms.map((room) => __awaiter(this, void 0, void 0, function* () {
                    const unreadCount = yield groupMessage_1.GroupMessage.count({
                        where: {
                            room_id: room.id,
                            sender_id: { [sequelize_1.Op.ne]: userId },
                            read: false,
                        },
                    });
                    return Object.assign(Object.assign({}, room.toJSON()), { unreadCount });
                })));
                return roomsWithUnreadCounts;
            }
            catch (error) {
                console.error("Error in getUserRooms:", error);
                throw error;
            }
        });
    }
    getUnreadGroupMessagesCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unreadCounts = yield groupMessage_1.GroupMessage.findAll({
                    attributes: [
                        ["room_id", "room_id"],
                        [database_1.default.fn("COUNT", database_1.default.col("GroupMessage.id")), "count"],
                    ],
                    include: [
                        {
                            model: groupMessage_1.Room,
                            as: "room",
                            required: true,
                            include: [
                                {
                                    model: user_1.default,
                                    as: "members",
                                    // through: RoomMember,
                                    where: { id: userId },
                                    attributes: [],
                                },
                            ],
                        },
                    ],
                    where: {
                        read: false,
                        sender_id: { [sequelize_1.Op.ne]: userId },
                    },
                    group: ["GroupMessage.room_id", "room.id"],
                });
                const countsMap = {};
                unreadCounts.forEach((result) => {
                    countsMap[result.room_id] = parseInt(result.getDataValue("count"));
                });
                return countsMap;
            }
            catch (error) {
                console.error("Error in getUnreadGroupMessagesCount:", error);
                throw error;
            }
        });
    }
    // async addMembersToRoom(roomId: number, userIds: number[]) {
    //   const members = userIds.map((userId) => ({
    //     room_id: roomId,
    //     user_id: userId,
    //   }));
    //   await RoomMember.bulkCreate(members);
    //   const room = await this.getRoomDetails(roomId);
    //   userIds.forEach((userId) => {
    //     io.to(`user:${userId}`).emit("added_to_room", room);
    //   });
    // }
    markGroupMessagesAsRead(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield groupMessage_1.GroupMessage.update({ read: true }, {
                where: {
                    room_id: roomId,
                    sender_id: { [sequelize_1.Op.ne]: userId },
                    read: false,
                },
            });
            server_1.io.to(`room:${roomId}`).emit("group_messages_read", { roomId, userId });
        });
    }
    // async getRoomDetails(roomId: number) {
    //   const room = await Room.findByPk(roomId, {
    //     include: [
    //       {
    //         model: User,
    //         through: RoomMember,
    //         attributes: ["id", "username", "is_online"],
    //       },
    //       {
    //         model: User,
    //         as: "creator",
    //         attributes: ["id", "username"],
    //       },
    //     ],
    //   });
    //   return room;
    // }
    removeUserFromRoom(roomId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield groupMessage_1.RoomMember.destroy({
                where: {
                    room_id: roomId,
                    user_id: userId,
                },
            });
            server_1.io.to(`user:${userId}`).emit("removed_from_room", roomId);
        });
    }
    deleteRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield groupMessage_1.Room.destroy({
                where: { id: roomId },
            });
            server_1.io.emit("room_deleted", roomId);
        });
    }
}
exports.default = new GroupMessageService();
