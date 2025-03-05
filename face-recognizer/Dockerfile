FROM python:3.11-slim

# ビルドに必要なツールをインストール
RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8888

ENV PYTHONUNBUFFERED=1

CMD ["functions-framework", "--target", "face_recognizer", "--source", "main.py", "--port", "8888", "--host", "0.0.0.0", "--debug"]