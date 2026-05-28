FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--ws-ping-interval", "20.0", "--ws-ping-timeout", "20.0"]