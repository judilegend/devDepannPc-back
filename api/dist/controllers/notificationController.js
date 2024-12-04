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
const notificationService_1 = __importDefault(require("../services/notificationService"));
class NotificationController {
    subscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const subscription = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Non authentifié" });
                }
                const savedSubscription = yield notificationService_1.default.saveSubscription(userId, subscription);
                res.status(201).json({
                    message: "Subscription saved",
                    subscription: savedSubscription,
                });
            }
            catch (error) {
                console.error("Subscription error:", error);
                res.status(500).json({ error: "Subscription failed" });
            }
        });
    }
    //get notification fonction
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Non authentifié" });
                }
                const notifications = yield notificationService_1.default.getNotifications(userId);
                res.json(notifications);
            }
            catch (error) {
                console.error("Error in getNotifications:", error);
                res.status(500).json({ error: "Failed to fetch notifications" });
            }
        });
    }
    notifyTaskAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { userId, taskTitle, taskId } = req.body;
                yield notificationService_1.default.notifyTaskAssignment(userId, {
                    title: taskTitle,
                    id: taskId,
                    assignedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                });
                res.status(200).json({ message: "Notification envoyée" });
            }
            catch (error) {
                console.error("Task assignment notification error:", error);
                res.status(500).json({ error: "Échec de l'envoi de la notification" });
            }
        });
    }
    getUnreadCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Non authentifié" });
                }
                const count = yield notificationService_1.default.getUnreadNotificationsCount(userId);
                res.json({ count });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to get unread count" });
            }
        });
    }
    markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { notificationId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(401).json({ error: "Non authentifié" });
                }
                yield notificationService_1.default.markNotificationAsRead(userId, notificationId);
                res.json({ message: "Notification marked as read" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to mark notification as read" });
            }
        });
    }
}
exports.default = new NotificationController();
