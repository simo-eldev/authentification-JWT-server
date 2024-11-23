require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors')



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json()); 
app.use(cors());
// Mock user data (in a real application, replace this with a database)
const mockUser = {
  email: "admin@admin.com",
  password: "admin",
};

// Route to authenticate and generate a token
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check user credentials
  if (email === mockUser.email && password === mockUser.password) {
    // Generate a JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
  }

  // Invalid credentials
  return res.status(401).json({ error: "Invalid email or password." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
