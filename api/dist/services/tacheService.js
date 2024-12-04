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
exports.getAllTaches = exports.getTachesByProjectId = exports.getAvailableTasks = exports.getTasksByCategory = exports.deleteTache = exports.updateTache = exports.getTachesByActiviteId = exports.updateTacheAssignment = exports.createTacheForActivite = exports.updateTacheStatus = exports.getTachesBySprintId = exports.assignTache = exports.createTache = void 0;
const sequelize_1 = require("sequelize");
const tache_1 = __importDefault(require("../models/tache"));
const user_1 = __importDefault(require("../models/user"));
const database_1 = __importDefault(require("../config/database"));
const notificationService_1 = __importDefault(require("./notificationService"));
const createTache = (TacheData) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = yield tache_1.default.create(TacheData);
    // If task is assigned to someone, trigger notification
    if (TacheData.assignedUserId) {
        try {
            const result = yield notificationService_1.default.notifyTaskAssignment(TacheData.assignedUserId, {
                id: tache.id,
                title: tache.title,
                assignedAt: new Date(),
            });
            console.log("Notification created:", result); // Debug log
        }
        catch (error) {
            console.error("Failed to create notification:", error);
        }
    }
    return tache;
});
exports.createTache = createTache;
const assignTache = (TacheId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = yield tache_1.default.findByPk(TacheId);
    if (!tache)
        throw new Error("Tache not found");
    const user = yield user_1.default.findByPk(userId);
    if (!user)
        throw new Error("User not found");
    yield tache.update({ assignedUserId: userId });
    // Send notification for task assignment
    try {
        const result = yield notificationService_1.default.notifyTaskAssignment(userId, {
            id: tache.id,
            title: tache.title,
            assignedAt: new Date(),
        });
        console.log("Assignment notification created:", result);
    }
    catch (error) {
        console.error("Failed to create assignment notification:", error);
    }
    return tache;
});
exports.assignTache = assignTache;
const getTachesBySprintId = (sprintId) => __awaiter(void 0, void 0, void 0, function* () {
    return tache_1.default.findAll({ where: { sprintId } });
});
exports.getTachesBySprintId = getTachesBySprintId;
const updateTacheStatus = (tacheId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ["todo", "in_progress", "review", "done"];
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid status provided");
    }
    const tache = yield tache_1.default.findByPk(tacheId, {
        include: [
            {
                model: user_1.default,
                as: "assignedUser",
            },
        ],
    });
    if (!tache)
        throw new Error("Task not found");
    // When task is marked as "review"
    if (status === "review") {
        // Notify Scrum Master, Lead Dev, and Tech Lead
        const leadRoles = yield user_1.default.findAll({
            where: {
                role: {
                    [sequelize_1.Op.in]: ["SCRUM_MASTER", "LEAD_DEV", "TECH_LEAD"],
                },
            },
        });
        // Send notifications to all leads
        for (const lead of leadRoles) {
            yield notificationService_1.default.notifyTaskAssignment(lead.id, {
                id: tacheId,
                title: `Review Required: ${tache.title}`,
                type: "TASK_REVIEW",
                data: {
                    taskId: tacheId,
                    developerId: tache.assignedUserId,
                    status: "review",
                },
            });
        }
    }
    // When task is marked as "done" or returned to "todo"
    if (status === "done" || status === "todo") {
        // Notify the assigned developer
        if (tache.assignedUserId) {
            yield notificationService_1.default.notifyTaskAssignment(tache.assignedUserId, {
                id: tacheId,
                title: status === "done"
                    ? `Task Approved: ${tache.title}`
                    : `Task Needs Revision: ${tache.title}`,
                type: status === "done" ? "TASK_APPROVED" : "TASK_REVISION",
                data: {
                    taskId: tacheId,
                    status: status,
                },
            });
        }
    }
    return yield tache.update({ status });
});
exports.updateTacheStatus = updateTacheStatus;
// Add these new methods
const createTacheForActivite = (activiteId, tacheData) => __awaiter(void 0, void 0, void 0, function* () {
    return tache_1.default.create(Object.assign(Object.assign({}, tacheData), { activiteId }));
});
exports.createTacheForActivite = createTacheForActivite;
const updateTacheAssignment = (tacheId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = yield tache_1.default.findByPk(tacheId);
    if (!tache)
        throw new Error("Tache not found");
    yield tache.update({ assignedUserId: userId });
    if (userId) {
        try {
            const result = yield notificationService_1.default.notifyTaskAssignment(userId, {
                id: tacheId,
                title: tache.title,
                assignedAt: new Date(),
            });
            console.log("Assignment notification created:", result); // Debug log
        }
        catch (error) {
            console.error("Failed to create assignment notification:", error);
        }
    }
    return tache;
});
exports.updateTacheAssignment = updateTacheAssignment;
// export const updateTacheStatus = async (TacheId: number, status: string) => {
//   const tache = await Tache.findByPk(TacheId);
//   if (!tache) throw new Error("Tache not found");
//   return tache.update({ status });
// };
const getTachesByActiviteId = (activiteId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tache_1.default.findAll({ where: { activiteId } });
});
exports.getTachesByActiviteId = getTachesByActiviteId;
const updateTache = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = yield tache_1.default.findByPk(id);
    if (!tache)
        throw new Error("Tache not found");
    return yield tache.update(data);
});
exports.updateTache = updateTache;
const deleteTache = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = yield tache_1.default.findByPk(id);
    if (!tache)
        throw new Error("Tache not found");
    yield tache.destroy();
});
exports.deleteTache = deleteTache;
const getTasksByCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tache_1.default.findAll();
    return {
        importantUrgent: tasks.filter((task) => task.importance === "important" && task.urgency === "urgent"),
        importantNotUrgent: tasks.filter((task) => task.importance === "important" && task.urgency === "not-urgent"),
        notImportantUrgent: tasks.filter((task) => task.importance === "not-important" && task.urgency === "urgent"),
        notImportantNotUrgent: tasks.filter((task) => task.importance === "not-important" && task.urgency === "not-urgent"),
    };
});
exports.getTasksByCategory = getTasksByCategory;
const getAvailableTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return tache_1.default.findAll({
        where: {
            status: {
                [sequelize_1.Op.notIn]: ["done"],
            },
            sprintId: null,
        },
        order: [
            ["urgency", "DESC"],
            ["importance", "DESC"],
            ["createdAt", "ASC"],
        ],
    });
});
exports.getAvailableTasks = getAvailableTasks;
// Ajouter cette nouvelle fonction
const getTachesByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield database_1.default.query(`SELECT t.*, a.id as activity_id 
       FROM Taches t 
       JOIN Activites a ON t.activiteId = a.id 
       JOIN WorkPackages w ON a.workPackageId = w.id 
       WHERE w.projectId = :projectId`, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return tasks.length > 0 ? tasks : [];
    }
    catch (error) {
        console.error("Database error:", error);
        return [];
    }
});
exports.getTachesByProjectId = getTachesByProjectId;
const getAllTaches = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield tache_1.default.findAll({
        order: [["createdAt", "DESC"]],
        include: [user_1.default],
    });
});
exports.getAllTaches = getAllTaches;
