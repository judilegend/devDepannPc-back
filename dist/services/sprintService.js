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
const sprint_1 = __importDefault(require("../models/sprint"));
const tache_1 = __importDefault(require("../models/tache"));
const sequelize_1 = require("sequelize");
class SprintService {
    createSprint(sprintData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sprint_1.default.create(sprintData);
        });
    }
    getAllSprints() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sprint_1.default.findAll({
                include: [
                    {
                        model: tache_1.default,
                        as: "tasks",
                    },
                ],
                order: [["startDate", "DESC"]],
            });
        });
    }
    getSprintById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sprint_1.default.findByPk(id, {
                include: [
                    {
                        model: tache_1.default,
                        as: "tasks",
                    },
                ],
            });
        });
    }
    updateSprint(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const sprint = yield sprint_1.default.findByPk(id);
            if (!sprint)
                throw new Error("Sprint not found");
            return yield sprint.update(updateData);
        });
    }
    deleteSprint(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sprint = yield sprint_1.default.findByPk(id);
            if (!sprint)
                throw new Error("Sprint not found");
            yield sprint.destroy();
            return { message: "Sprint deleted successfully" };
        });
    }
    addTaskToSprint(sprintId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sprint = yield sprint_1.default.findByPk(sprintId);
            const task = yield tache_1.default.findByPk(taskId);
            if (!sprint || !task) {
                throw new Error("Sprint or Task not found");
            }
            yield task.update({ sprintId });
            return task;
        });
    }
    updateSprintProgress(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sprint = yield sprint_1.default.findByPk(sprintId, {
                include: [
                    {
                        model: tache_1.default,
                        as: "tasks",
                    },
                ],
            });
            if (!sprint)
                throw new Error("Sprint not found");
            const tasks = sprint.tasks || [];
            const completedTasks = tasks.filter((task) => task.status === "done").length;
            const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
            yield sprint.update({ progress });
            return sprint;
        });
    }
    getActiveSprintTasks(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tache_1.default.findAll({
                where: {
                    sprintId,
                    status: {
                        [sequelize_1.Op.ne]: "done",
                    },
                },
            });
        });
    }
}
exports.default = new SprintService();
