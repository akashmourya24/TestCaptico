const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "testQuicky";

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });                                        // Check if user already exists
    if (existingUser) return res.status(400).json({ message: "Email already exists" });   

    const hashedPassword = await bcrypt.hash(password, 10);                                                                // Hash the password
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;                   
    const user = await prisma.user.findUnique({ where: { email } });                                                    // Check if user exists or not
    if (!user) return res.status(400).json({ message: "Email Id doesn't exist" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
