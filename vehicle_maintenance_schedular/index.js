const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjeTk3NDJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzIxMiwiaWF0IjoxNzc3NzAyMzEyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYmE0MTgyYWEtYTU0OC00NzhiLTg0MmItMzdkODk0ZWNmZDJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieSBjaGFuZHJha2FudGggcmVkZHkiLCJzdWIiOiJlM2NkMzA1MS0zMjczLTRiNzQtYmU0NC04MTFmNmJjOTBmMDkifSwiZW1haWwiOiJjeTk3NDJAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ5IGNoYW5kcmFrYW50aCByZWRkeSIsInJvbGxObyI6InJhMjMxMTAzMDA1MDUxIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZTNjZDMwNTEtMzI3My00Yjc0LWJlNDQtODExZjZiYzkwZjA5IiwiY2xpZW50U2VjcmV0IjoidUJTRVRrUnhXQ3FCRU56YyJ9.ZQeSQkhzfdSL2Fn3ZYg8PRfN-Odh2WXro0WJb-B7UCs";

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
};

const DEPOT_API = "http://20.207.122.201/evaluation-service/depots";
const VEHICLE_API = "http://20.207.122.201/evaluation-service/vehicles";

// Knapsack function
function knapsack(tasks, capacity) {
  const n = tasks.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = tasks[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          Impact + dp[i - 1][w - Duration]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

async function main() {
  try {
    const depotRes = await axios.get(DEPOT_API, { headers: HEADERS });
    const vehicleRes = await axios.get(VEHICLE_API, { headers: HEADERS });

    const depots = depotRes.data.depots;
    const vehicles = vehicleRes.data.vehicles;

    console.log("=== OPTIMAL RESULTS ===");

    depots.forEach((depot) => {
      const maxImpact = knapsack(vehicles, depot.MechanicHours);

      console.log(`Depot ${depot.ID}: Max Impact = ${maxImpact}`);
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

main();