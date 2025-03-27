const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a course
exports.createCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;
    const course = await prisma.course.create({ data: { name, description, instructor } });
    res.json({ message: "Course created Successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  const course = await prisma.course.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description, instructor },
    });
    res.json({ message: "Course updated", updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    await prisma.course.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
