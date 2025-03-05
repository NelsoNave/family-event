import requests
import json

def test_post():
    # Cloud FunctionsのトリガーURLに変更
    url = "https://face-recognizer-189967247128.us-west1.run.app"
    
    # 既存のテストデータ
    test_data = {
        "image_urls": [
            #"https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128689/amane_whosn9.jpg",
            "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741182571/Billie_Eilish_0_pligvw.jpg"
        ],
        "known_faces_urls": {
            "Biden": "https://raw.githubusercontent.com/ageitgey/face_recognition/master/examples/biden.jpg",
            "Elmer": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1731916167/qorws7mpkurpzdzlogs4.jpg",
            "Amane": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128699/amane-1_bpyegy.jpg",
            "Billy": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741182571/Billie_Eilish_1_ngb1p5.jpg"
        },
        "tolerance": 0.6  
    }
    
    # ヘッダー
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    print("Sending POST request to:", url)
    print("Headers:", headers)
    print("Data:", json.dumps(test_data, indent=2))
    
    # POSTリクエスト送信
    response = requests.post(url, json=test_data, headers=headers)
    
    print("\nResponse:")
    print(f"Status Code: {response.status_code}")
    print("Headers:", dict(response.headers))
    try:
        print("Body:", json.dumps(response.json(), indent=2))
    except:
        print("Raw response:", response.text)

if __name__ == "__main__":
    test_post()