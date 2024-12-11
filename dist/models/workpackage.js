"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const activite_1 = __importDefault(require("./activite"));
class WorkPackage extends sequelize_1.Model {
}
WorkPackage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "WorkPackage",
});
WorkPackage.hasMany(activite_1.default, {
    foreignKey: "workPackageId",
    as: "activities",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = WorkPackage;
