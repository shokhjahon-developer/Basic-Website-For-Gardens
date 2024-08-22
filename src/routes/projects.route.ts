import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/index";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
