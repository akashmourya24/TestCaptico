require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/userRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const { errorHandler } = require("./src/middleware/error");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes for api
app.use("/api/auth", userRoute);  // User Routes
app.use("/api/courses", courseRoutes);  // Course Routes


app.use(errorHandler); // Error Handling Middleware

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
