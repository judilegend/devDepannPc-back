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
const bcrypt_1 = __importDefault(require("bcrypt"));
const tache_1 = __importDefault(require("./tache"));
class User extends sequelize_1.Model {
    comparePassword(candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(candidatePassword, this.password);
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("user", "admin", "product_owner", "lead_developer", "scrum_master", "developper", "tech_lead"),
        defaultValue: "user",
    },
    is_online: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    last_activity: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: "users",
    sequelize: database_1.default,
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed("password")) {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed("password")) {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
        }),
    },
});
// Task relationship
User.hasMany(tache_1.default, {
    foreignKey: "assignedUserId",
    as: "Taches",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// Direct Message relationships will be handled in DirectMessage model
// to avoid circular dependencies
exports.default = User;
