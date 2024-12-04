"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Subscribe to push notifications
router.post("/subscribe", authMiddleware_1.authenticate, notificationController_1.default.subscribe);
// Get all notifications for current user
router.get("/", authMiddleware_1.authenticate, notificationController_1.default.getNotifications);
// Get unread notifications count
router.get("/unread-count", authMiddleware_1.authenticate, notificationController_1.default.getUnreadCount);
// Mark notification as read
router.put("/:notificationId/read", authMiddleware_1.authenticate, notificationController_1.default.markAsRead);
// Task assignment notification
router.post("/task-assigned", authMiddleware_1.authenticate, notificationController_1.default.notifyTaskAssignment);
exports.default = router;
