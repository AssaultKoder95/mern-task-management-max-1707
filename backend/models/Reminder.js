import mongoose from "mongoose";

const { Schema } = mongoose;

const ReminderSchema = new Schema(
  {
    remindOn: {
      type: Date,
      required: true,
    },
    sent: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reminder", ReminderSchema);
