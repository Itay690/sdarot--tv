from datetime import datetime, timezone


def format_date(date_string):
    # Parse the date string to a datetime object
    date = datetime.fromisoformat(date_string.rstrip("Z")).replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)

    # Calculate the difference
    delta = now - date
    days_ago = delta.days
    hours_ago, remainder = divmod(delta.seconds, 3600)
    minutes_ago = remainder // 60

    # Format the output based on the difference
    if days_ago > 0:
        return f"{days_ago} days ago"
    elif hours_ago > 0:
        return f"{hours_ago} hours ago"
    elif minutes_ago > 0:
        return f"{minutes_ago} minutes ago"
    else:
        return "Just now"
