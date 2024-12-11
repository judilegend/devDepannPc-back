"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
const piece_jointe_1 = __importDefault(require("./piece_jointe"));
class DirectMessage extends sequelize_1.Model {
}
DirectMessage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    sender_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    receiver_id: {
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
    },
}, {
    tableName: "direct_messages",
    sequelize: database_1.default,
    timestamps: true,
    underscored: true,
});
DirectMessage.belongsTo(user_1.default, { as: "sender", foreignKey: "sender_id" });
DirectMessage.belongsTo(user_1.default, { as: "receiver", foreignKey: "receiver_id" });
DirectMessage.hasMany(piece_jointe_1.default, {
    foreignKey: "messageId",
    as: "attachments",
});
exports.default = DirectMessage;
