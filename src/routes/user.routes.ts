import { Router } from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controllers";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllUsers);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
