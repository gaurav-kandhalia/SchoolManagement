import express from "express";
import morgan from "morgan";
import schoolRouter from "./Routes/school.router.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});
app.use("/api/v1/schools", schoolRouter);



export { app };

app.use((err, req, res, next) => {
 if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: err.errors?.[0]?.message || err.message || "Validation error",
      errors: err.errors || [],
    });

}


  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}); 