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
exports.getProjectProgress = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const project_1 = __importDefault(require("../models/project"));
const workpackage_1 = __importDefault(require("../models/workpackage"));
const createProject = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.create(projectData);
    return project;
});
exports.createProject = createProject;
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.findAll({
        include: [{ model: workpackage_1.default, as: "workPackages" }],
    });
    return projects;
});
exports.getAllProjects = getAllProjects;
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findByPk(id, {
        include: [{ model: workpackage_1.default, as: "workPackages" }],
    });
    return project;
});
exports.getProjectById = getProjectById;
const updateProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findByPk(id);
    if (!project) {
        throw new Error("Project not found");
    }
    return project.update(data);
});
exports.updateProject = updateProject;
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findByPk(id);
    if (!project) {
        throw new Error("Project not found");
    }
    return project.destroy();
});
exports.deleteProject = deleteProject;
const getProjectProgress = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.default.query("SELECT * FROM vw_project_task_status WHERE projectId = :projectId", {
        replacements: { projectId },
        type: sequelize_1.QueryTypes.SELECT,
    });
    return result;
});
exports.getProjectProgress = getProjectProgress;
