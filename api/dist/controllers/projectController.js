"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const projectService = __importStar(require("../services/projectService"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectData = Object.assign(Object.assign({}, req.body), { createdBy: req.user.id });
        const project = yield projectService.createProject(projectData);
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating project",
            error: "An unknown error occurred",
        });
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectService.getAllProjects();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching projects",
            error: "An unknown error occurred",
        });
    }
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield projectService.getProjectById(parseInt(id));
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching project",
            error: "An unknown error occurred",
        });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedProject = yield projectService.updateProject(parseInt(id), req.body);
        res.json(updatedProject);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error updating project", error: "an unknown error" });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield projectService.deleteProject(parseInt(id));
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting project", error: "an unknown error" });
    }
});
exports.deleteProject = deleteProject;
