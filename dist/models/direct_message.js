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
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class DirectMessage extends sequelize_1.Model {
    static getConversationUsingProc(user1Id_1, user2Id_1) {
        return __awaiter(this, arguments, void 0, function* (user1Id, user2Id, limit = 50, offset = 0) {
            try {
                const [results] = yield database_1.default.query("CALL sp_get_conversation(:user1Id, :user2Id, :limit, :offset)", {
                    replacements: { user1Id, user2Id, limit, offset },
                    type: sequelize_1.QueryTypes.RAW,
                });
                return Array.isArray(results) ? results : [];
            }
            catch (error) {
                console.error("Error in getConversationUsingProc:", error);
                return [];
            }
        });
    }
    static markMessagesReadUsingProc(receiverId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("CALL sp_mark_messages_read(:receiverId, :senderId)", {
                replacements: { receiverId, senderId },
                type: sequelize_1.QueryTypes.RAW,
            });
        });
    }
    static getLatestMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query("SELECT * FROM vw_latest_messages", {
                type: sequelize_1.QueryTypes.SELECT,
            });
        });
    }
    static getUnreadCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query("SELECT receiver_id, unread_count FROM vw_unread_messages_count WHERE receiver_id = :userId", {
                replacements: { userId },
                type: sequelize_1.QueryTypes.SELECT,
            });
        });
    }
}
DirectMessage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "sender_id",
    },
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "receiver_id",
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize: database_1.default,
    modelName: "DirectMessage",
    tableName: "direct_messages",
    timestamps: true,
    underscored: true,
});
DirectMessage.belongsTo(user_1.default, {
    as: "sender",
    foreignKey: "sender_id",
});
DirectMessage.belongsTo(user_1.default, {
    as: "receiver",
    foreignKey: "receiver_id",
});
exports.default = DirectMessage;
