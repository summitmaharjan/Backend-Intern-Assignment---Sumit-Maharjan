import asyncHandler from "../utils/asyncHandler.js";
import { Label } from "../models/labels.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createLabels = asyncHandler(async (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    throw new ApiError(400, "Name and color is required.");
  }

  const existingLabel = await Label.findOne({ name: name.trim() });
  if (existingLabel) {
    throw new ApiError(400, "Label with the name already exist.");
  }

  const newLabel = await Label.create({
    name: name.trim(),
    color: color.trim(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newLabel, "Label created Successfully."));
});

const getAllLabels = asyncHandler(async (req, res) => {
  const AllLabels = await Label.find();

  if (!AllLabels || AllLabels.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No labels to show"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, AllLabels, "All Labels fetched Successfull."));
});

const getLabelById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const label = await Label.findById(id);

  if (!label) {
    throw new ApiError(404, "Label not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, label, "Label fetched successfully"));
});

const updateLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  const updatedLabel = await Label.findByIdAndUpdate(
    id,
    { name, color },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedLabel) {
    throw new ApiError(404, "Label not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedLabel, "Label updated successfully"));
});

const deleteLabel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedLabel = await Label.findByIdAndDelete(id);

  if (!deletedLabel) {
    throw new ApiError(404, "Label not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Label deleted successfully"));
});

export { createLabels, getAllLabels, getLabelById, updateLabel, deleteLabel };
