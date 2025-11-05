import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiPaginationResponse } from "../utils/ApiPaginationResponse.js";
import { Task } from "../models/tasks.model.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  if (!title) throw new ApiError(400, "Title is required");

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    due_date,
    createdBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status, priority } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, createdBy: req.user._id },
    { title, description, dueDate, status, priority },
    { new: true, runValidators: true }
  );

  if (!task) throw new ApiError(404, "Task not found or not authorized");

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

const getAllTask = asyncHandler(async (req, res) => {
  const { page, limit, sort, status, priority } = req.query;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 25;

  const skip = (Number(currentPage) - 1) * Number(currentLimit);
  const filterQuery = {
    $and: [{ createdBy: req.user._id }],
  };

  if (status) filterQuery.$and.push({ status });
  if (priority) filterQuery.$and.push({ priority });

  const sortOrder = sort === "desc" ? -1 : 1;

  const tasks = await Task.find(filterQuery)
    .sort({ due_date: sort ? sortOrder : 1 })
    .skip(skip)
    .limit(currentLimit);

  const total = await Task.find(filterQuery).countDocuments();
  const hasNext = currentPage * limit < total;
  const hasPrev = currentPage > 1;

  const pagination = {
    page: currentPage,
    limit: currentLimit,
    total,
    hasPrev,
    hasNext,
  };

  if (!tasks || tasks.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No tasks to show"));
  }
  const response = res
    .status(200)
    .json(
      new ApiPaginationResponse(
        200,
        tasks,
        pagination,
        "Tasks fetched successfully"
      )
    );
  console.log(response);
  return response;
});

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({
    _id: id,
    createdBy: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task fetched successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({
    _id: id,
    createdBy: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"));
});

export { createTask, deleteTask, updateTask, getAllTask, getTaskById };
