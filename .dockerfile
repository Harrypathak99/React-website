version: '3.8'

services:
  web:
    build: .
    command: ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
    ports:
      - "8000:80"
    volumes:
      - .:/app
    environment:
      - PYTHONUNBUFFERED=1
