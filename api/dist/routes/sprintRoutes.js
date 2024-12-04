"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sprintController_1 = __importDefault(require("../controllers/sprintController"));
// import { authenticateToken } from "../middleware/auth";
const router = express_1.default.Router();
// Protection de toutes les routes avec authentification
// router.use(authenticateToken);
// Routes CRUD de base
router.post("/", sprintController_1.default.createSprint);
router.get("/", sprintController_1.default.getAllSprints);
router.get("/:id", sprintController_1.default.getSprintById);
router.put("/:id", sprintController_1.default.updateSprint);
router.delete("/:id", sprintController_1.default.deleteSprint);
// Routes spécifiques aux fonctionnalités du sprint
router.post("/:id/tasks", sprintController_1.default.addTaskToSprint);
router.get("/:id/progress", sprintController_1.default.getSprintProgress);
router.get("/:id/active-tasks", sprintController_1.default.getActiveSprintTasks);
exports.default = router;
