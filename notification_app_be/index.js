const express = require("express");
const Log = require("../logging_middleware/logger.js");

const app = express();

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  Log("backend", "info", "route", "Test route called");
  res.json({ message: "Server running" });
});

// Notification API
app.post("/notifications", (req, res) => {
  try {
    Log("backend", "info", "controller", "Creating notification");

    const data = req.body;

    if (!data.message) {
      Log("backend", "error", "handler", "Missing message field");
      return res.status(400).json({ error: "Message required" });
    }

    Log("backend", "info", "service", "Notification created successfully");

    res.json({ success: true, data });
  } catch (err) {
    Log("backend", "fatal", "controller", "Server crash");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server (ONLY ONCE)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});