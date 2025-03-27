const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createCourse);
router.get("/", authMiddleware, getAllCourses);
router.get("/read/:id", authMiddleware, getCourseById);
router.put("/update/:id", authMiddleware, updateCourse);
router.delete("/delete/:id", authMiddleware, deleteCourse);

module.exports = router;
