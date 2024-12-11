"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskPermissions = void 0;
exports.taskPermissions = {
    canMarkAsReview: (role) => {
        const allowedRoles = [
            "developer",
            "lead_developer",
            "tech_lead",
            "scrum_master",
        ];
        return role && allowedRoles.includes(role);
    },
    canMarkAsDone: (role) => {
        const allowedRoles = ["scrum_master", "lead_developer", "tech_lead"];
        return role && allowedRoles.includes(role);
    },
    canMarkAsRedo: (role) => {
        const allowedRoles = ["scrum_master", "lead_developer", "tech_lead"];
        return role && allowedRoles.includes(role);
    },
    isValidStatusTransition: (currentStatus, newStatus, role) => {
        if (role === "developer") {
            if (currentStatus === "in_progress" && newStatus === "review") {
                return true;
            }
            return false;
        }
        const leadRoles = ["scrum_master", "lead_developer", "tech_lead"];
        return leadRoles.includes(role || "");
    },
};
