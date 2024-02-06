import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRotuer from "./routes/user.routes.js";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json())
dotenv.config();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => console.log(error));

app.use('/api/auth', authRouter)  
app.use('/api', userRotuer)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";

  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
