import asyncHandler from "../utils/asyncHandler.js";
import { TaskLabel } from "../models/taskLabel.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/tasks.model.js";
import mongoose from "mongoose";
import { Label } from "../models/labels.model.js";

export const createLabelsToTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { labelIds = [] } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, null, "Invalid taskId format"));
  }

  // verify if task exits
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(400, "Task not Found.");
  }

  // verify labels exits
  const validateLabels = await Label.find({ _id: { $in: labelIds } });
  if (validateLabels.length === 0) {
    throw new ApiError(400, "Invalid Label ids.");
  }

  const allData = validateLabels.map((label) => ({
    task_id: task._id,
    label_id: label._id,
  }));

  await TaskLabel.bulkWrite(
    allData.map((doc) => ({
      updateOne: {
        filter: { task_id: doc.task_id, label_id: doc.label_id },
        update: doc,
        upsert: true, // update or create if the doc doesn't exists
      },
    }))
  );

  const data = await TaskLabel.find({ task: taskId }).populate("label");
  return res
    .status(200)
    .json(
      new ApiResponse(200, data, null, "Labels added to task successfully")
    );
});

// Remove One Label from a task
export const removeLabelFromTask = asyncHandler(async (req, res) => {
  const { taskId, labelId } = req.params;

  const result = await TaskLabel.findOneAndDelete({
    task_id: taskId,
    label_id: labelId,
  });

  if (!result) {
    throw new ApiError(400, "Label not Found in this task");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, null, null, "Label removed from task successfully")
    );
});

// Get all labels from a  task

export const getAllLabelsFromTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  // verify if task exits
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(400, "Task not Found.");
  }

  const labels = await TaskLabel.find({ task_id: taskId }).populate("label_id");
  return res
    .status(200)
    .json(
      new ApiResponse(200, labels, null, "Label fetched from task successfully")
    );
});

// Get all task related to label id
export const getTasksByLabel = asyncHandler(async (req, res) => {
  const { labelId } = req.params;

  // verify if task exits
  const label = await Label.findById(labelId);
  if (!label) {
    throw new ApiError(400, "Label not Found.");
  }

  const tasks = await TaskLabel.find({ label_id: labelId }).populate("task_id");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, null, "Tasks  fetched successfully"));
});
