const axios = require("axios");

const TOKEN = "YOUR_TOKEN";

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    // ❗ IMPORTANT: don't crash app
    console.error("Log failed (ignored)");
  }
};

module.exports = Log;