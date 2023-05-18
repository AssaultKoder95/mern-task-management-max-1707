import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "inprogess", "completed", "rejected"],
      required: true,
      default: "todo",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reminder: {
      type: Schema.Types.ObjectId,
      ref: "Reminder",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
