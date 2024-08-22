import { Router } from "express";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  getContact,
} from "../controllers/index";

const router = Router();

router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
