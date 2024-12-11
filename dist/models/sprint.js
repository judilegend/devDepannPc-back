"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const tache_1 = __importDefault(require("./tache"));
class Sprint extends sequelize_1.Model {
}
Sprint.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    goal: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("planned", "in_progress", "in_review", "completed"),
        allowNull: false,
        defaultValue: "planned",
    },
}, {
    sequelize: database_1.default,
    modelName: "Sprint",
    tableName: "sprints",
});
const defineAssociations = () => {
    Sprint.hasMany(tache_1.default, {
        foreignKey: "sprintId",
        as: "tasks",
    });
};
setTimeout(defineAssociations, 0);
exports.default = Sprint;
