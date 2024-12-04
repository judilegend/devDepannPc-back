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
exports.getCurrentPomodoro = exports.getPomodorosForTache = exports.completePomodoro = exports.startPomodoro = void 0;
const pomodoroService = __importStar(require("../services/pomodoroService"));
const startPomodoro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tacheId } = req.params;
        const pomodoro = yield pomodoroService.startPomodoro(parseInt(tacheId));
        res.json(pomodoro);
    }
    catch (error) {
        res.status(400).json({
            message: "Error starting Pomodoro",
            error: "An unknown error occurred",
        });
    }
});
exports.startPomodoro = startPomodoro;
const completePomodoro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pomodoroId } = req.params;
        const pomodoro = yield pomodoroService.completePomodoro(parseInt(pomodoroId));
        res.json(pomodoro);
    }
    catch (error) {
        res.status(400).json({
            message: "Error completing Pomodoro",
            error: "An unknown error occurred",
        });
    }
});
exports.completePomodoro = completePomodoro;
const getPomodorosForTache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tacheId } = req.params;
        const pomodoros = yield pomodoroService.getPomodorosForTache(parseInt(tacheId));
        res.json(pomodoros);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching Pomodoros",
            error: "An unknown error occurred",
        });
    }
});
exports.getPomodorosForTache = getPomodorosForTache;
const getCurrentPomodoro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tacheId } = req.params;
        const pomodoro = yield pomodoroService.getCurrentPomodoro(parseInt(tacheId));
        res.json(pomodoro);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching current Pomodoro",
            error: "An unknown error occurred",
        });
    }
});
exports.getCurrentPomodoro = getCurrentPomodoro;
