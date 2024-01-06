import express from "express";
import {createIssue, getAllIssues, getIssueById, updateIssueById,deleteIssueById} from "../controllers/issue.js"
const router = express.Router();

// Create a new issue
router.post("/", createIssue);

// Get all issues
router.get("/", getAllIssues);

// Get by id
router.get(
  "/:id",
  getIssueById
);

// Update issue by id
router.put(
  "/:id",
  updateIssueById
);

// Delete by id
router.delete(
  "/:id",
  deleteIssueById
);

export default router;
