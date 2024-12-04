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
exports.getCurrentPomodoro = exports.getPomodorosForTache = exports.completePomodoro = exports.startPomodoro = void 0;
const tache_1 = __importDefault(require("../models/tache"));
const pomodoro_1 = __importDefault(require("../models/pomodoro"));
const sequelize_1 = require("sequelize");
const WORK_DURATION = 25 * 60 * 1000;
const SHORT_BREAK_DURATION = 5 * 60 * 1000;
const LONG_BREAK_DURATION = 20 * 60 * 1000;
const startPomodoro = (tacheId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tache = yield tache_1.default.findByPk(tacheId, { include: ["pomodoros"] });
    if (!tache)
        throw new Error("Tache not found");
    if (tache.completedPomodoros >= tache.estimatedPomodoros) {
        throw new Error("All estimated Pomodoros for this task have been completed");
    }
    const pomodoroCount = ((_a = tache.pomodoros) === null || _a === void 0 ? void 0 : _a.length) || 0;
    let type = "work";
    if (pomodoroCount > 0 && pomodoroCount % 4 === 0) {
        type = "long_break";
    }
    else if (pomodoroCount > 0) {
        type = "short_break";
    }
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() +
        (type === "work"
            ? WORK_DURATION
            : type === "short_break"
                ? SHORT_BREAK_DURATION
                : LONG_BREAK_DURATION));
    const pomodoro = yield pomodoro_1.default.create({
        tacheId,
        startTime,
        endTime,
        type,
    });
    return pomodoro;
});
exports.startPomodoro = startPomodoro;
const completePomodoro = (pomodoroId) => __awaiter(void 0, void 0, void 0, function* () {
    const pomodoro = yield pomodoro_1.default.findByPk(pomodoroId, {
        include: [{ model: tache_1.default, as: "Tache" }],
    });
    if (!pomodoro)
        throw new Error("Pomodoro not found");
    yield pomodoro.update({ completed: true, endTime: new Date() });
    if (pomodoro.type === "work" && pomodoro.Tache) {
        yield pomodoro.Tache.increment("completedPomodoros");
        if (pomodoro.Tache.completedPomodoros >= pomodoro.Tache.estimatedPomodoros) {
            yield pomodoro.Tache.update({ status: "done" });
        }
        else if (pomodoro.Tache.status === "todo") {
            yield pomodoro.Tache.update({ status: "in_progress" });
        }
    }
    return pomodoro;
});
exports.completePomodoro = completePomodoro;
const getPomodorosForTache = (tacheId) => __awaiter(void 0, void 0, void 0, function* () {
    return pomodoro_1.default.findAll({
        where: { tacheId },
        order: [["startTime", "ASC"]],
    });
});
exports.getPomodorosForTache = getPomodorosForTache;
const getCurrentPomodoro = (tacheId) => __awaiter(void 0, void 0, void 0, function* () {
    return pomodoro_1.default.findOne({
        where: {
            tacheId,
            completed: false,
            endTime: { [sequelize_1.Op.gt]: new Date() },
        },
    });
});
exports.getCurrentPomodoro = getCurrentPomodoro;
