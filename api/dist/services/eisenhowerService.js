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
exports.getTasksByQuadrant = exports.categorizeTask = void 0;
const tache_1 = __importDefault(require("../models/tache"));
const categorizeTask = (taskId, urgency, importance) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tache_1.default.findByPk(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    yield task.update({ urgency, importance });
    return task;
});
exports.categorizeTask = categorizeTask;
const getTasksByQuadrant = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tache_1.default.findAll();
    const quadrants = {
        "urgent-important": [],
        "urgent-not-important": [],
        "not-urgent-important": [],
        "not-urgent-not-important": [],
    };
    // tasks.forEach((task) => {
    //   const key = `${task.urgency}-${task.importance}`;
    //   quadrants[key].push(task);
    // });
    return quadrants;
});
exports.getTasksByQuadrant = getTasksByQuadrant;
