"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tache = exports.Sprint = void 0;
const sprint_1 = __importDefault(require("./sprint"));
exports.Sprint = sprint_1.default;
const tache_1 = __importDefault(require("./tache"));
exports.Tache = tache_1.default;
// Define associations here after all models are imported
sprint_1.default.hasMany(tache_1.default, {
    foreignKey: "sprintId",
    as: "tasks",
});
tache_1.default.belongsTo(sprint_1.default, {
    foreignKey: "sprintId",
    as: "sprint",
});
