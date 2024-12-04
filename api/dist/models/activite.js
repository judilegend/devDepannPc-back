"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const tache_1 = __importDefault(require("./tache"));
class Activite extends sequelize_1.Model {
}
Activite.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    workPackageId: {
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
    modelName: "Activite",
});
Activite.hasMany(tache_1.default, {
    foreignKey: "activiteId",
    as: "Taches",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// Add this after the existing relationships
// Activite.hasMany(PieceJointe, {
//   foreignKey: "activiteId",
//   as: "pieceJointes",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
exports.default = Activite;
