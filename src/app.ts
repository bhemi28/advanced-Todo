import express from "express";
import { json } from "body-parser";
import { connectDatabase } from "./config/database";
import todoRoutes from "./routes/todoRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Database connection
connectDatabase();

// Routes
app.use(todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
