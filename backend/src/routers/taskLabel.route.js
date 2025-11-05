import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createLabelsToTask,
  removeLabelFromTask,
  getAllLabelsFromTask,
  getTasksByLabel,
} from "../controllers/taskLabel.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TaskLabels
 *   description: TaskLabels management endpoints
 */

/**
 * @swagger
 * /tasklabel/{taskId}/labels:
 *   post:
 *     summary: Create a new taskLabel
 *     tags: [TaskLabels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label_id]
 *             properties:
 *               labelIds:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       201: { description: TaskLabel created successfully }
 */
router.post("/:taskId/labels", verifyJWT, createLabelsToTask);

/**
 * @swagger
 * /tasklabel/{taskId}/label/{labelId}:
 *   delete:
 *     summary: remove a Label from task
 *     tags: [TaskLabels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: labelId
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       201: { description: Label removed from task successfully }
 */
router.delete("/:taskId/label/:labelId", verifyJWT, removeLabelFromTask);

/**
 * @swagger
 * /tasklabel/{taskId}/labels:
 *   get:
 *     summary: get all labels from task
 *     tags: [TaskLabels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       201: { description: Labels fetched from task successfully }
 */
router.get("/:taskId/labels", verifyJWT, getAllLabelsFromTask);

/**
 * @swagger
 * /tasklabel/label/{labelId}:
 *   get:
 *     summary: get all tasks from label
 *     tags: [TaskLabels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: labelId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       201: { description: Tasks fetched from label successfully }
 */
router.get("/label/:labelId", verifyJWT, getTasksByLabel);

export default router;
