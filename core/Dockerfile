FROM python:3.14-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

COPY . .

CMD ["python", "main.py"]