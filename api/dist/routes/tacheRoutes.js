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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tacheController = __importStar(require("../controllers/tacheController"));
const router = express_1.default.Router();
router.post("/", tacheController.createTache);
router.get("/:activiteId", tacheController.getTachesByActiviteId);
router.put("/:id", tacheController.updateTache);
router.delete("/:id", tacheController.deleteTache);
router.put("/:taskId/categorize", tacheController.categorizeTask);
router.get("/quadrants", tacheController.getTasksByQuadrant);
router.get("/sprint/:sprintId", tacheController.getTachesBySprintId);
// Add these new routes
router.post("/activite/:activiteId", tacheController.createTacheForActivite);
router.put("/:id/assign", tacheController.assignTache);
router.get("/activity/:activiteId", tacheController.getTachesByActiviteId);
router.put("/:id/status", tacheController.updateTacheStatus);
router.get("/categories", tacheController.getTasksByCategory);
router.get("/available", tacheController.getAvailableTasks);
router.get("/project/:projectId", tacheController.getTachesByProjectId);
router.get("/all", tacheController.getAllTaches);
exports.default = router;
