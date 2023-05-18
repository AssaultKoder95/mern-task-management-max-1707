import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Sentry from "@sentry/node";
import allRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_URL_STRING = process.env.CLIENT_URL || "http://localhost:3000";

const allowedDomains = CLIENT_URL_STRING.split(", ");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  tracesSampleRate: 1.0,
});

// middleware
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", allRoutes);

// sentry handlers
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.statusCode >= 400) {
        return true;
      }
      return false;
    },
  })
);

// error handler
app.use((err, req, res, _) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// eslint-disable-next-line import/prefer-default-export
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
