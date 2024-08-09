def fetch_suggestions_accepted(log_file_path='copilot_usage.log'):
    accepted_count = 0
    try:
        with open(log_file_path, 'r') as log_file:
            for line in log_file:
                if 'Accepted' in line:
                    accepted_count += 1
    except FileNotFoundError:
        print(f"Log file {log_file_path} not found.")
    return accepted_count

def fetch_suggestions_rejected(log_file_path='copilot_usage.log'):
    rejected_count = 0
    try:
        with open(log_file_path, 'r') as log_file:
            for line in log_file:
                if 'Rejected' in line:
                    rejected_count += 1
    except FileNotFoundError:
        print(f"Log file {log_file_path} not found.")
    return rejected_count

def fetch_total_coding_time(log_file_path='copilot_usage.log'):
    # Placeholder implementation, replace with actual logic if available
    total_coding_time = 0
    try:
        with open(log_file_path, 'r') as log_file:
            for line in log_file:
                # Assuming each log entry represents a coding session of 10 minutes
                total_coding_time += 600  # 10 minutes in seconds
    except FileNotFoundError:
        print(f"Log file {log_file_path} not found.")
    return total_coding_time

def collect_copilot_metrics():
    metrics = {
        "suggestions_accepted": fetch_suggestions_accepted(),
        "suggestions_rejected": fetch_suggestions_rejected(),
        "total_coding_time": fetch_total_coding_time()
    }
    return metrics

if __name__ == "__main__":
    metrics = collect_copilot_metrics()
    print("Copilot Usage Metrics:")
    print(f"Suggestions Accepted: {metrics['suggestions_accepted']}")
    print(f"Suggestions Rejected: {metrics['suggestions_rejected']}")
    print(f"Total Coding Time: {metrics['total_coding_time']} seconds")