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
exports.getSalleById = exports.removeUserFromSalle = exports.addUserToSalle = exports.getAllSalles = exports.createSalle = void 0;
const salle_1 = __importDefault(require("../models/salle"));
const user_1 = __importDefault(require("../models/user"));
const sequelize_1 = require("sequelize");
const createSalle = (name_1, creatorId_1, ...args_1) => __awaiter(void 0, [name_1, creatorId_1, ...args_1], void 0, function* (name, creatorId, members = []) {
    const salle = yield salle_1.default.create({
        name,
        creatorId,
        members: [creatorId, ...members],
    });
    if (members.length > 0) {
        yield salle.addUsers(members.map((id) => parseInt(id)));
    }
    return salle;
});
exports.createSalle = createSalle;
const getAllSalles = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return salle_1.default.findAll({
        include: [
            {
                model: user_1.default,
                as: "users",
                attributes: ["id", "name", "email", "is_online"],
                through: { attributes: [] },
            },
            {
                model: user_1.default,
                as: "creator",
                attributes: ["id", "name", "email"],
            },
        ],
        where: {
            members: {
                [sequelize_1.Op.contains]: [userId],
            },
        },
    });
});
exports.getAllSalles = getAllSalles;
const addUserToSalle = (salleId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const salle = yield salle_1.default.findByPk(salleId);
    if (!salle) {
        throw new Error("Salle not found");
    }
    yield salle.addUser(parseInt(userId));
    return salle;
});
exports.addUserToSalle = addUserToSalle;
const removeUserFromSalle = (salleId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const salle = yield salle_1.default.findByPk(salleId);
    if (!salle) {
        throw new Error("Salle not found");
    }
    yield salle.removeUser(parseInt(userId));
    return salle;
});
exports.removeUserFromSalle = removeUserFromSalle;
const getSalleById = (salleId) => __awaiter(void 0, void 0, void 0, function* () {
    const salle = yield salle_1.default.findByPk(salleId, {
        include: [
            {
                model: user_1.default,
                as: "users",
                attributes: ["id", "name", "email", "is_online"],
            },
        ],
    });
    if (!salle) {
        throw new Error("Salle not found");
    }
    return salle;
});
exports.getSalleById = getSalleById;
