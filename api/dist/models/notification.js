"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class Notification extends sequelize_1.Model {
}
Notification.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: "Notification",
    tableName: "notifications",
});
Notification.belongsTo(user_1.default, { foreignKey: "userId" });
user_1.default.hasMany(Notification, { foreignKey: "userId" });
exports.default = Notification;
