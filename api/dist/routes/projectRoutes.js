"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// router.post("/", authenticate, authorizeClient, createProject);
// router.get("/", authenticate, authorizeAdmin, getAllProjects);
// router.put("/:id", authenticate, authorizeAdmin, updateProject);
// router.delete("/:id", authenticate, authorizeAdmin, deleteProject);
router.post("/", authMiddleware_1.authenticate, roleMiddleware_1.authorizeProjectCreation, projectController_1.createProject);
router.get("/:id", projectController_1.getProjectById); // Ajout de la route manquante
router.get("/", projectController_1.getAllProjects);
router.put("/:id", projectController_1.updateProject);
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
