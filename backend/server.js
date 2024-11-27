import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";
import protectedRoute from "./middlewares/protectedRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(protectedRoute);

app.use("/", urlRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`);
	connectMongoDB();
});
