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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to create user",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.getUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.updateUser(Number(req.params.id), req.body);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to update user",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_1.userService.deleteUser(Number(req.params.id));
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to delete user",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.deleteUser = deleteUser;
