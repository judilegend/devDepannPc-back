"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PieceJointe extends sequelize_1.Model {
}
PieceJointe.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    messageId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    groupMessageId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    filename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    originalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "PieceJointe",
    tableName: "piece_jointes",
});
exports.default = PieceJointe;
