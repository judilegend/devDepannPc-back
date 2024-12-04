"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.removeUserFromSalle = exports.addUserToSalle = exports.getAllSalleStockage = exports.createSalle = void 0;
const salleService = __importStar(require("../services/salleService"));
const createSalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, members } = req.body;
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const salle = yield salleService.createSalle(name, req.user.id, members);
        res.status(201).json(salle);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the salle" });
    }
});
exports.createSalle = createSalle;
const getAllSalleStockage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const salles = yield salleService.getAllSalles(req.user.id);
        res.json(salles);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching salles" });
    }
});
exports.getAllSalleStockage = getAllSalleStockage;
const addUserToSalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { salleId, userId } = req.body;
        const updatedSalle = yield salleService.addUserToSalle(salleId, userId);
        res.json(updatedSalle);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while adding user to salle" });
    }
});
exports.addUserToSalle = addUserToSalle;
const removeUserFromSalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { salleId, userId } = req.body;
        const updatedSalle = yield salleService.removeUserFromSalle(salleId, userId);
        res.json(updatedSalle);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while removing user from salle" });
    }
});
exports.removeUserFromSalle = removeUserFromSalle;
