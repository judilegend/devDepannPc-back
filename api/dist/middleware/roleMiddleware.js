"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeActivityManagement = exports.authorizeWorkPackageManagement = exports.authorizeProjectCreation = void 0;
const authorizeProjectCreation = (req, res, next) => {
    const allowedRoles = ["admin", "product_owner", "scrum_master"];
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: "Access denied. Only Product Owner, Admin, or Scrum Master can create projects.",
        });
    }
    next();
};
exports.authorizeProjectCreation = authorizeProjectCreation;
// New work package management middleware
const authorizeWorkPackageManagement = (req, res, next) => {
    const allowedRoles = [
        "admin",
        "product_owner",
        "scrum_master",
        "lead_developer",
        "tech_lead",
    ];
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: "Access denied. Only Admin, Product Owner, Lead Developer or Tech Lead can manage work packages.",
        });
    }
    next();
};
exports.authorizeWorkPackageManagement = authorizeWorkPackageManagement;
//activite
const authorizeActivityManagement = (req, res, next) => {
    const allowedRoles = [
        "admin",
        "product_owner",
        "lead_developer",
        "tech_lead",
        "scrum_master",
    ];
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: "Access denied. Only authorized team members can manage activities.",
        });
    }
    next();
};
exports.authorizeActivityManagement = authorizeActivityManagement;
