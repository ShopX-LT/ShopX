# Stage 1: Build the Flask application
FROM python:3.8-slim AS builder

WORKDIR /app

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the Flask app port (change to the appropriate port if needed)
EXPOSE 8000

# Start the Flask app using Gunicorn
CMD ["gunicorn", "app:app", "-w", "4", "-b", "0.0.0.0:8000"]
