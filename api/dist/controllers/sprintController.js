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
const sprintService_1 = __importDefault(require("../services/sprintService"));
class SprintController {
    createSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprint = yield sprintService_1.default.createSprint(req.body);
                res.status(201).json(sprint);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAllSprints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprints = yield sprintService_1.default.getAllSprints();
                res.json(sprints);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getSprintById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprint = yield sprintService_1.default.getSprintById(Number(req.params.id));
                if (!sprint) {
                    return res.status(404).json({ message: "Sprint not found" });
                }
                res.json(sprint);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    updateSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprint = yield sprintService_1.default.updateSprint(Number(req.params.id), req.body);
                res.json(sprint);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sprintService_1.default.deleteSprint(Number(req.params.id));
                res.json({ message: "Sprint deleted successfully" });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    addTaskToSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.body;
                const sprintId = Number(req.params.id);
                const task = yield sprintService_1.default.addTaskToSprint(sprintId, taskId);
                yield sprintService_1.default.updateSprintProgress(sprintId);
                res.json(task);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getSprintProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprint = yield sprintService_1.default.updateSprintProgress(Number(req.params.id));
                res.json(sprint);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getActiveSprintTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield sprintService_1.default.getActiveSprintTasks(Number(req.params.id));
                res.json(tasks);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = new SprintController();
