import { Router } from "express";
import {
  createLabels,
  deleteLabel,
  getAllLabels,
  getLabelById,
  updateLabel,
} from "../controllers/label.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Labels
 *   description: Label management endpoints
 */
/**
 * @swagger
 * /label/createLabel:
 *   post:
 *     summary: Create a new label
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Label created successfully
 */
router.post("/createLabel", verifyJWT, createLabels);

/**
 * @swagger
 * /label/getAllLabels:
 *   get:
 *     summary: Get all labels
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all labels
 */
router.route("/getAllLabels").get(verifyJWT, getAllLabels);

/**
 * @swagger
 * /label/{id}:
 *   get:
 *     summary: Get label by ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Label ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label details fetched successfully
 */
router.get("/:id", verifyJWT, getLabelById);

/**
 * @swagger
 * /label/{id}:
 *   put:
 *     summary: Update label by ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Label ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Label updated successfully
 */
router.put("/:id", verifyJWT, updateLabel);

/**
 * @swagger
 * /label/{id}:
 *   delete:
 *     summary: Delete label by ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Label ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label deleted successfully
 */
router.delete("/:id", verifyJWT, deleteLabel);

export default router;
