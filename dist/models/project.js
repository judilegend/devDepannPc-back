"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const workpackage_1 = __importDefault(require("./workpackage"));
class Project extends sequelize_1.Model {
}
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    clientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    clientSurname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    clientPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    clientEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    requestedBudgetLowwer: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    requestedBudgetUpper: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("submitted", "in_review", "approved", "rejected"),
        defaultValue: "submitted",
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    modelName: "Project",
});
Project.hasMany(workpackage_1.default, {
    foreignKey: "projectId",
    as: "workPackages",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = Project;
