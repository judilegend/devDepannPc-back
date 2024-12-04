"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Pomodoro extends sequelize_1.Model {
}
Pomodoro.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tacheId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("work", "short_break", "long_break"),
        defaultValue: "work",
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Pomodoro",
});
exports.default = Pomodoro;
