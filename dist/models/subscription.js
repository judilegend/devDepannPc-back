"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Subscription extends sequelize_1.Model {
}
Subscription.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    endpoint: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    p256dh: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    auth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Subscription",
});
exports.default = Subscription;
