import Reminder from "../models/Reminder.js";
import cron from "node-cron";

cron.schedule("* * * * *", async function () {
  console.log("cron being called");

  const reminders = await Reminder.find({
    sent: false,
    $lte: new Date(),
  }).exec();

  // send emails to these users of these reminders

  const taskIds = reminders.map(({ task }) => task.id);
  await Reminder.updateMany({ task: { $in: taskIds } }, { sent: true });
});
