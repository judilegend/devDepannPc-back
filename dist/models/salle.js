"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class Salle extends sequelize_1.Model {
    addUsers(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            this.members = [...this.members, ...userIds];
            yield this.save();
        });
    }
    addUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.members = [...this.members, userId];
            yield this.save();
        });
    }
    removeUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.members = this.members.filter((id) => id !== userId);
            yield this.save();
        });
    }
}
Salle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    creatorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    members: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: "[]",
        get() {
            const rawValue = this.getDataValue("members");
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue("members", JSON.stringify(value));
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "Salle",
});
// Define associations
Salle.belongsTo(user_1.default, { as: "creator", foreignKey: "creatorId" });
Salle.belongsToMany(user_1.default, { through: "SalleMembers", as: "users" });
user_1.default.belongsToMany(Salle, { through: "SalleMembers", as: "salles" });
exports.default = Salle;
