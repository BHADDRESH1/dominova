import { Router } from "express";
import * as salaryController from "../controllers/salary.controller";

const router = Router();

router.get("/", salaryController.getAllSalaries);
router.get("/month/:month/:year", salaryController.getSalariesByMonth);
router.get("/stats/:month/:year", salaryController.getSalaryStats);
router.get("/:id", salaryController.getSalaryById);
router.post("/", salaryController.createSalary);
router.put("/:id", salaryController.updateSalary);
router.put("/:id/status", salaryController.updatePaymentStatus);
router.delete("/:id", salaryController.deleteSalary);

export default router;
