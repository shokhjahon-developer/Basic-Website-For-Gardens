import { Request, Response } from "express";
import { Worker } from "../entities/index";
import * as Joi from "joi";

export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getWorker = async (req: Request, res: Response) => {
  try {
    const worker = await Worker.findOne({ where: { id: req.params.id } });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found!" });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const addWorker = async (req: Request, res: Response) => {
  const { name, position, experience } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    position: Joi.string().min(3).required(),
    experience: Joi.string().min(1).required(),
  });

  const { error } = schema.validate({ name, position, experience });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const newWorker = Worker.create({ name, position, experience });
    await newWorker.save();
    res.json(newWorker);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateWorker = async (req: Request, res: Response) => {
  try {
    const worker = await Worker.findOne({ where: { id: req.params.id } });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found!" });
    }

    const { name, position, experience } = req.body;

    const schema = Joi.object({
      name: Joi.string().min(3).optional(),
      position: Joi.string().min(3).optional(),
      experience: Joi.string().min(1).optional(),
    });

    const { error } = schema.validate({ name, position, experience });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await Worker.update(worker.id, { name, position, experience });
    res.json({ message: "Worker updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteWorker = async (req: Request, res: Response) => {
  try {
    const worker = await Worker.findOne({ where: { id: req.params.id } });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found!" });
    }
    await Worker.delete(worker.id);
    res.json({ message: "Worker deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
