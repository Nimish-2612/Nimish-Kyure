import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import courseRoutes from "./routes/course.route.js";
import courseProgress from "./routes/courseProgress.route.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coursePurchaseRoutes from "./routes/purchaseCourse.route.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Connect to Database
connectDB();

const app = express();

// ✅ CORS CONFIGURATION - Ensure this comes before route definitions
app.use(
  cors({
    origin: "https://skill-pact-final.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]// Allows cookies/sessions
  })
);

// ✅ Ensure preflight requests (OPTIONS) are handled properly
app.options("*", cors());

// ✅ Log requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Body Parsers & Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/course-progress", courseProgress);
app.use("/api/course-purchase", coursePurchaseRoutes);
app.use("/api/badges", badgeRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running...."));
}

// ✅ Error Handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
