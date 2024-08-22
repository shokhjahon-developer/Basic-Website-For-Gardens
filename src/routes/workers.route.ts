import { Router } from "express";
import {
  addWorker,
  getWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
} from "../controllers/index";

const router = Router();

router.get("/", getWorkers);
router.get("/:id", getWorker);
router.post("/", addWorker);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

export default router;
