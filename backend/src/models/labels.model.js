import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
});

export const Label = new mongoose.model("Label", labelSchema);
