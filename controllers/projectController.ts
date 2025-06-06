import * as projectService from "../services/projectService";
import { Request, Response } from "express";

export const createProject = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const projectData = {
      ...req.body,
      createdBy: req.user.id,
    };
    const project = await projectService.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: "An unknown error occurred",
    });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: "An unknown error occurred",
    });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(parseInt(id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching project",
      error: "An unknown error occurred",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProject = await projectService.updateProject(
      parseInt(id),
      req.body
    );
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: "an unknown error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(parseInt(id));
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: "an unknown error" });
  }
};
