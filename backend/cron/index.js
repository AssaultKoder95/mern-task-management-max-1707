import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import { connectDB } from "../index.js";
import sendEmail from "../utils/emailSender.js";

cron.schedule("* * * * *", async () => {
  try {
    await connectDB();

    const reminders = await Reminder.find({
      sent: false,
    }).populate({
      path: "task",
      populate: [
        {
          path: "user",
        },
      ],
    });

    console.log(`Successfully fetched ${reminders.length} reminders from DB.`);

    const remindersPayload = reminders.map(
      ({
        task: {
          user: { name, email },
          title,
          dueDate,
        },
        remindOn,
        _id,
      }) => ({
        email,
        name,
        remindOn,
        dueDate,
        title,
        reminderId: _id,
      })
    );

    const sendingEmailPromises = remindersPayload.map(
      ({ title, email, dueDate, name }) =>
        sendEmail({
          subject: `reminder for task - ${title}`,
          to: email,
          text: `Hey ${name}, A friendly reminder about your task - ${title} pending on ${dueDate}.`,
        })
    );

    await Promise.allSettled(sendingEmailPromises);
    console.log("Successfully sent email to all recipients.");

    const reminderIds = remindersPayload.map(({ reminderId }) => reminderId);
    await Reminder.updateMany({ _id: { $in: reminderIds } }, { sent: true });
    console.log("Successfully updated status in DB.");
  } catch (error) {
    console.log(error);
  }
});
