import mongoose from "mongoose";

const taskLabelSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  label_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
    required: true,
  },
});

export const TaskLabel = new mongoose.model("TaskLabel", taskLabelSchema);
