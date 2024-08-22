import { Request, Response } from "express";
import { Project } from "../entities/index";
import * as Joi from "joi";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id } });
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const addProject = async (req: Request, res: Response) => {
  const { title, name, description, link } = req.body;

  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    link: Joi.string().uri().required(),
  });

  const { error } = schema.validate({ title, name, description, link });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const newProject = Project.create({ title, name, description, link });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id } });
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    const { title, name, description, link } = req.body;

    const schema = Joi.object({
      title: Joi.string().min(3).optional(),
      name: Joi.string().min(3).optional(),
      description: Joi.string().min(10).optional(),
      link: Joi.string().uri().optional(),
    });

    const { error } = schema.validate({ title, name, description, link });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await Project.update(project.id, { title, name, description, link });
    res.json({ message: "Project updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id } });
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    await Project.delete(project.id);
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
