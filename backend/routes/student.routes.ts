import { Router } from "express";
import * as studentController from "../controllers/student.controller";

const router = Router();

router.get("/", studentController.getAllStudents);
router.get(
  "/ambassador/:ambassadorId",
  studentController.getStudentsByAmbassador,
);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.put("/:id/status", studentController.updateStudentStatus);
router.delete("/:id", studentController.deleteStudent);

export default router;
