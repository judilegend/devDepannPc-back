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
exports.deleteActivite = exports.updateActivite = exports.getActivitesByWorkPackageId = exports.createActivite = void 0;
const activiteService = __importStar(require("../services/activiteService"));
const createActivite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activite = yield activiteService.createActivite(req.body);
        res.status(201).json(activite);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(400)
                .json({ message: "Error creating activite", error: error.message });
        }
        else {
            res.status(400).json({
                message: "Error creating activite",
                error: "An unknown error occurred",
            });
        }
    }
});
exports.createActivite = createActivite;
const getActivitesByWorkPackageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activites = yield activiteService.getActivitesByWorkPackageId(parseInt(req.params.workPackageId));
        res.json(activites);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(400)
                .json({ message: "Error fetching activites", error: error.message });
        }
        else {
            res.status(400).json({
                message: "Error fetching activites",
                error: "An unknown error occurred",
            });
        }
    }
});
exports.getActivitesByWorkPackageId = getActivitesByWorkPackageId;
const updateActivite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activite = yield activiteService.updateActivite(parseInt(req.params.id), req.body);
        res.json(activite);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(400)
                .json({ message: "Error updating activite", error: error.message });
        }
        else {
            res.status(400).json({
                message: "Error updating activite",
                error: "An unknown error occurred",
            });
        }
    }
});
exports.updateActivite = updateActivite;
const deleteActivite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield activiteService.deleteActivite(parseInt(req.params.id));
        res.json({ message: "Activite deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(400)
                .json({ message: "Error deleting activite", error: error.message });
        }
        else {
            res.status(400).json({
                message: "Error deleting activite",
                error: "An unknown error occurred",
            });
        }
    }
});
exports.deleteActivite = deleteActivite;
