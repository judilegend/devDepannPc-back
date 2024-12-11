"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessage = exports.RoomMember = exports.Room = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
const piece_jointe_1 = __importDefault(require("./piece_jointe"));
class Room extends sequelize_1.Model {
}
exports.Room = Room;
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
}, {
    tableName: "rooms",
    sequelize: database_1.default,
    timestamps: true,
    underscored: true,
});
class RoomMember extends sequelize_1.Model {
}
exports.RoomMember = RoomMember;
RoomMember.init({
    room_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Room,
            key: "id",
        },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
}, {
    tableName: "room_members",
    sequelize: database_1.default,
    timestamps: true,
    underscored: true,
});
class GroupMessage extends sequelize_1.Model {
}
exports.GroupMessage = GroupMessage;
GroupMessage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    room_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Room,
            key: "id",
        },
    },
    sender_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    tableName: "group_messages",
    sequelize: database_1.default,
    timestamps: true,
    underscored: true,
});
// Set up associations
// Update associations with clear aliases
// Room.belongsToMany(User, { through: RoomMember, as: "members" });
// User.belongsToMany(Room, { through: RoomMember, as: "rooms" });
// Room.belongsTo(User, { as: "creator", foreignKey: "created_by" });
// RoomMember.belongsTo(User, { foreignKey: "user_id" });
// RoomMember.belongsTo(Room, { foreignKey: "room_id" });
// GroupMessage.belongsTo(Room, { foreignKey: "room_id" });
// GroupMessage.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
// Room.hasMany(GroupMessage, { foreignKey: "room_id" });
// Update associations with clear aliases
// First, clear all existing associations
// Room.associations = {};
// User.associations = {};
// Then define the associations with explicit aliases
Room.belongsToMany(user_1.default, {
    through: RoomMember,
    as: "members",
    foreignKey: "room_id",
    onDelete: "CASCADE",
});
user_1.default.belongsToMany(Room, {
    through: RoomMember,
    as: "rooms",
    foreignKey: "user_id",
    otherKey: "room_id",
    uniqueKey: "room_member_unique",
});
Room.belongsTo(user_1.default, {
    as: "creator",
    foreignKey: "created_by",
});
GroupMessage.belongsTo(Room, {
    as: "room",
    foreignKey: "room_id",
});
GroupMessage.belongsTo(user_1.default, {
    as: "sender",
    foreignKey: "sender_id",
});
Room.hasMany(GroupMessage, {
    as: "messages",
    foreignKey: "room_id",
    onDelete: "CASCADE",
});
GroupMessage.hasMany(piece_jointe_1.default, {
    foreignKey: "groupMessageId",
    as: "attachments",
    constraints: false,
});
exports.default = { Room, RoomMember, GroupMessage };
