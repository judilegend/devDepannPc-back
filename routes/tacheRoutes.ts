import express from "express";
import * as tacheController from "../controllers/tacheController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

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

export default router;
