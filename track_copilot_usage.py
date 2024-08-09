import json
import os
from datetime import datetime

# Example function to simulate collecting Copilot metrics
def collect_copilot_metrics():
    metrics = {
        "suggestions_accepted": 20,  # Replace with actual data collection logic
        "suggestions_rejected": 5,   # Replace with actual data collection logic
        "total_coding_time": 3600    # Replace with actual data collection logic (in seconds)
    }
    return metrics

# Collect the metrics
metrics = collect_copilot_metrics()

# Save metrics to a JSON file
with open('copilot_metrics.json', 'w') as json_file:
    json.dump(metrics, json_file)

print("Copilot metrics collected and saved to copilot_metrics.json")

# Example dynamic data
metrics = {
    "timestamp": datetime.utcnow().isoformat(),
    "commit": os.getenv("GITHUB_SHA"),
    "copilot_usage": {
        # Example static data replaced with actual dynamic usage data
        "suggestions_accepted": 10,
        "suggestions_rejected": 5
    }
}

# Save metrics to JSON file
with open("copilot_metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)