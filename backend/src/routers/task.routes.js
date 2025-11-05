import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /task/createTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, status, priority]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [Pending, In-Progress, Completed] }
 *               priority: { type: string, enum: [Low, Medium, High] }
 *               due_date: { type: string, format: date }
 *               labels:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       201: { description: Task created successfully }
 */
router.post("/createTask", verifyJWT, createTask);

/**
 * @swagger
 * /task/getAllTask:
 *   get:
 *     summary: Get all tasks of the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, In-Progress, Completed]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Low, Medium, High]
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/getAllTask", verifyJWT, getAllTask);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task details fetched successfully }
 */
router.get("/:id", verifyJWT, getTaskById);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [Pending, In-Progress, Completed] }
 *               priority: { type: string, enum: [Low, Medium, High] }
 *               due_date: { type: string, format: date }
 *               labels:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200: { description: Task updated successfully }
 */
router.put("/:id", verifyJWT, updateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task deleted successfully }
 */
router.delete("/:id", verifyJWT, deleteTask);

export default router;
