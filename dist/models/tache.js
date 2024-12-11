"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const pomodoro_1 = __importDefault(require("./pomodoro"));
const user_1 = __importDefault(require("./user"));
const sprint_1 = __importDefault(require("./sprint"));
class Tache extends sequelize_1.Model {
}
Tache.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    activiteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("todo", "in_progress", "review", "done"),
        defaultValue: "todo",
    },
    assignedUserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: user_1.default,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    sprintId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: sprint_1.default,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    estimatedPomodoros: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 4,
        },
    },
    completedPomodoros: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    urgency: {
        type: sequelize_1.DataTypes.ENUM("urgent", "not-urgent"),
        allowNull: false,
        defaultValue: "not-urgent",
    },
    importance: {
        type: sequelize_1.DataTypes.ENUM("important", "not-important"),
        allowNull: false,
        defaultValue: "not-important",
    },
}, {
    sequelize: database_1.default,
    modelName: "Tache",
});
Tache.hasMany(pomodoro_1.default, {
    foreignKey: "tacheId",
    as: "pomodoros",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = Tache;
