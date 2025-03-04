import requests
import json

# ローカルサーバーのURL
url = "http://localhost:8888"

# テストデータ
test_data = {
    "image_urls": [
        "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128705/amane-5_nquzeg.jpg",
        "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128700/amane-2_dzv5xz.jpg"
    ],
    "known_faces_urls": {
        "Amane": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128689/amane_whosn9.jpg"
    },
    "tolerance": 0.5
}

# POSTリクエストを送信
response = requests.post(url, json=test_data)

# レスポンスを表示
print(f"Status Code: {response.status_code}")
print(json.dumps(response.json(), indent=4)) 