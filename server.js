import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = 8001;

connectDB();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.error.details.map(d => d.message)
    });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

app.use("/auth", authRoute);

app.get('/', (req, res) => {
  res.send("API is Running");
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});