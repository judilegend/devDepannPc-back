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
const web_push_1 = __importDefault(require("web-push"));
const subscription_1 = __importDefault(require("../models/subscription"));
const notification_1 = __importDefault(require("../models/notification"));
const user_1 = __importDefault(require("../models/user"));
class NotificationService {
    setSocketIO(io) {
        this.io = io;
    }
    saveSubscription(userId, subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { endpoint, keys } = subscription;
                const existingSubscription = yield subscription_1.default.findOne({
                    where: { endpoint },
                });
                if (existingSubscription) {
                    return existingSubscription;
                }
                return yield subscription_1.default.create({
                    userId,
                    endpoint,
                    p256dh: keys.p256dh,
                    auth: keys.auth,
                });
            }
            catch (error) {
                console.error("Save subscription error:", error);
                throw error;
            }
        });
    }
    //get notification
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notification_1.default.findAll({
                    where: { userId },
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: user_1.default,
                            attributes: ["id", "username"],
                        },
                    ],
                });
                return notifications;
            }
            catch (error) {
                console.error("Error fetching notifications:", error);
                throw error;
            }
        });
    }
    notifyTaskAssignment(userId, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create notification title and body based on type
                let title, body;
                switch (task.type) {
                    case "TASK_REVIEW":
                        title = "Nouvelle tâche à réviser";
                        body = `Le développeur a terminé la tâche: ${task.title}. Révision requise.`;
                        break;
                    case "TASK_APPROVED":
                        title = "Tâche approuvée";
                        body = `Votre tâche "${task.title}" a été validée!`;
                        break;
                    case "TASK_REVISION":
                        title = "Révision requise";
                        body = `La tâche "${task.title}" nécessite des modifications.`;
                        break;
                    default:
                        title = "Nouvelle tâche assignée";
                        body = `Vous avez été assigné à la tâche: ${task.title}`;
                }
                const payload = {
                    id: Date.now().toString(),
                    title,
                    body,
                    data: Object.assign(Object.assign({}, task.data), { type: task.type, url: `/tasks/${task.id}` }),
                    icon: "/icons/icon-192x192.png",
                    timestamp: new Date(),
                    read: false,
                };
                // Save notification to database
                const notification = yield notification_1.default.create({
                    userId,
                    title: payload.title,
                    body: payload.body,
                    data: payload.data,
                    read: false,
                });
                // Get user's push subscriptions
                const subscriptions = yield subscription_1.default.findAll({
                    where: { userId },
                });
                // Send push notifications
                const pushPromises = subscriptions.map((sub) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const pushSubscription = {
                            endpoint: sub.endpoint,
                            keys: {
                                p256dh: sub.p256dh,
                                auth: sub.auth,
                            },
                        };
                        yield web_push_1.default.sendNotification(pushSubscription, JSON.stringify(payload));
                    }
                    catch (error) {
                        console.error("Push notification failed:", error);
                    }
                }));
                yield Promise.allSettled(pushPromises);
                // Get updated unread count
                const unreadCount = yield this.getUnreadNotificationsCount(userId);
                // Emit socket event
                if (this.io) {
                    this.io.to(`user:${userId}`).emit("taskAssigned", {
                        notification,
                        unreadCount,
                    });
                }
                return { notification, unreadCount };
            }
            catch (error) {
                console.error("Notification service error:", error);
                throw error;
            }
        });
    }
    markNotificationAsRead(userId, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notification_1.default.update({ read: true }, {
                where: {
                    id: notificationId,
                    userId,
                },
            });
            // Emit socket event to update UI in real-time
            if (this.io) {
                const unreadCount = yield this.getUnreadNotificationsCount(userId);
                this.io.to(`user:${userId}`).emit("notificationRead", {
                    notificationId,
                    unreadCount,
                });
            }
        });
    }
    getUnreadNotificationsCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_1.default.count({
                where: {
                    userId,
                    read: false,
                },
            });
        });
    }
}
exports.default = new NotificationService();
