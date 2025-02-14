const connectDB = require("./db");
const User = require("./schema/user_schema");
const winston = require("winston");

require("dotenv").config();
const app = require("./server.js");
connectDB();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

app.post("/users", async (req, res) => {
  try {
    console.log(`UserModel ${req.body}`);
    const user = new User(req.body);
    await user.save();
    logger.info("User created:", user);
    res.status(201).json(user);
  } catch (error) {
    logger.error("Error creating user:", err);
    res.status(400).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    logger.info("User updated:", user);
    res.json(user);
  } catch (err) {
    logger.error("Error updating user:", err);
    res.status(400).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    logger.info("Fetched users:", users);
    res.json(users);
  } catch (err) {
    logger.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
});
