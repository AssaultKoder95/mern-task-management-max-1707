import mongoose from "mongoose";

const { Schema } = mongoose;

const taskHistorySchema = new Schema(
  {
    changes: {
      type: String,
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TaskHistory", taskHistorySchema);
