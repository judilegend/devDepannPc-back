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
exports.getAllTaches = exports.getTasksByQuadrant = exports.categorizeTask = exports.deleteTache = exports.updateTache = exports.getAvailableTasks = exports.getTasksByCategory = exports.getTachesByActiviteId = exports.updateTacheStatus = exports.assignTache = exports.createTacheForActivite = exports.getTachesBySprintId = exports.getTachesByProjectId = exports.createTache = void 0;
const tacheService = __importStar(require("../services/tacheService"));
const eisenhowerService = __importStar(require("../services/eisenhowerService"));
const createTache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tache = yield tacheService.createTache(req.body);
        res.status(201).json(tache);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating tache",
            error: "an unknown error occurred",
        });
    }
});
exports.createTache = createTache;
// Ajouter ce nouveau contrôleur
const getTachesByProjectId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const taches = yield tacheService.getTachesByProjectId(parseInt(projectId));
        res.json(taches);
    }
    catch (error) {
        console.error("Project tasks fetch error:", error);
        res.status(500).json({
            message: "Error fetching project tasks",
            error: "an unknown error occurred",
        });
    }
});
exports.getTachesByProjectId = getTachesByProjectId;
const getTachesBySprintId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sprintId } = req.params;
        const taches = yield tacheService.getTachesBySprintId(parseInt(sprintId));
        res.json(taches);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching taches",
            error: "an unknown error occurred",
        });
    }
});
exports.getTachesBySprintId = getTachesBySprintId;
// Add these new controller methods
const createTacheForActivite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activiteId } = req.params;
        const tache = yield tacheService.createTacheForActivite(parseInt(activiteId), req.body);
        res.status(201).json(tache);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating tache",
            error: "an unknown error occurred",
        });
    }
});
exports.createTacheForActivite = createTacheForActivite;
const assignTache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const tache = yield tacheService.updateTacheAssignment(parseInt(id), userId);
        res.json(tache);
    }
    catch (error) {
        res.status(400).json({
            message: "Error assigning tache",
            error: "an unknown error occurred",
        });
    }
});
exports.assignTache = assignTache;
const updateTacheStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const tache = yield tacheService.updateTacheStatus(parseInt(id), status);
        res.json(tache);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating task status",
            error: "an unknown error occurred",
        });
    }
});
exports.updateTacheStatus = updateTacheStatus;
const getTachesByActiviteId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taches = yield tacheService.getTachesByActiviteId(parseInt(req.params.activiteId));
        res.json(taches);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching taches",
            error: "an unknown error occurred",
        });
    }
});
exports.getTachesByActiviteId = getTachesByActiviteId;
const getTasksByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorizedTasks = yield tacheService.getTasksByCategory();
        res.json(categorizedTasks);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching categorized tasks",
            error: "an unknown error occurred",
        });
    }
});
exports.getTasksByCategory = getTasksByCategory;
const getAvailableTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tacheService.getAvailableTasks();
        res.json(tasks);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching available tasks",
            error: "an unknown error occurred",
        });
    }
});
exports.getAvailableTasks = getAvailableTasks;
const updateTache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tache = yield tacheService.updateTache(parseInt(req.params.id), req.body);
        res.json(tache);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating tache",
            error: "an unknown error occurred",
        });
    }
});
exports.updateTache = updateTache;
const deleteTache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tacheService.deleteTache(parseInt(req.params.id));
        res.json({ message: "Tache deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: "Error deleting tache",
            error: "an unknown error occurred",
        });
    }
});
exports.deleteTache = deleteTache;
const categorizeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { urgency, importance } = req.body;
        const task = yield eisenhowerService.categorizeTask(parseInt(taskId), urgency, importance);
        res.json(task);
    }
    catch (error) {
        res.status(400).json({
            message: "Error categorizing task",
            error: "an unknown error occurred",
        });
    }
});
exports.categorizeTask = categorizeTask;
const getTasksByQuadrant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quadrants = yield eisenhowerService.getTasksByQuadrant();
        res.json(quadrants);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching tasks by quadrant",
            error: "an unknown error occurred",
        });
    }
});
exports.getTasksByQuadrant = getTasksByQuadrant;
const getAllTaches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taches = yield tacheService.getAllTaches();
        res.json(taches);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching all tasks",
            error: "an unknown error occurred",
        });
    }
});
exports.getAllTaches = getAllTaches;
