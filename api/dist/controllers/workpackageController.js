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
exports.deleteWorkPackage = exports.updateWorkPackage = exports.getWorkPackageById = exports.getWorkPackagesByProjectId = exports.createWorkPackage = void 0;
const workpackageService = __importStar(require("../services/workpackageService"));
const createWorkPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workPackage = yield workpackageService.createWorkPackage(req.body);
        res.status(201).json(workPackage);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating work package",
            error: "an unknown error occurred",
        });
    }
});
exports.createWorkPackage = createWorkPackage;
const getWorkPackagesByProjectId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workPackages = yield workpackageService.getWorkPackagesByProjectId(parseInt(req.params.projectId));
        res.json(workPackages);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching work packages",
            error: "an unknown error occurred",
        });
    }
});
exports.getWorkPackagesByProjectId = getWorkPackagesByProjectId;
const getWorkPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workPackage = yield workpackageService.getWorkPackageById(parseInt(req.params.id));
        if (!workPackage) {
            return res.status(404).json({ message: "Work package not found" });
        }
        res.json(workPackage);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching work package",
            error: "an unknown error occurred",
        });
    }
});
exports.getWorkPackageById = getWorkPackageById;
const updateWorkPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workPackage = yield workpackageService.updateWorkPackage(parseInt(req.params.id), req.body);
        res.json(workPackage);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating work package",
            error: "an unknown error occurred",
        });
    }
});
exports.updateWorkPackage = updateWorkPackage;
const deleteWorkPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield workpackageService.deleteWorkPackage(parseInt(req.params.id));
        res.json({ message: "Work package deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: "Error deleting work package",
            error: "an unknown error occurred",
        });
    }
});
exports.deleteWorkPackage = deleteWorkPackage;
