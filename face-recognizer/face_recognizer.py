#!/usr/bin/env python3
import sys
import face_recognition
import json
import numpy as np
import os
import requests
import tempfile
import functions_framework

def download_image_from_url(url):
    """URLから画像をダウンロードして一時ファイルに保存"""
    try:
        # 画像をダウンロード
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # 一時ファイルに保存
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        for chunk in response.iter_content(chunk_size=8192):
            temp_file.write(chunk)
        temp_file.close()
        
        return temp_file.name
    except Exception as e:
        print(f"Error downloading image from {url}: {str(e)}")
        return None

def load_known_faces(known_faces_urls):
    """URLから既知の顔画像を読み込み、エンコーディングを生成"""
    known_encodings = {}
    
    for name, url in known_faces_urls.items():
        temp_path = download_image_from_url(url)
        if temp_path:
            try:
                img = face_recognition.load_image_file(temp_path)
                encodings = face_recognition.face_encodings(img)
                if encodings:
                    known_encodings[name] = encodings[0]
                else:
                    print(f"Warning: No face found in {url}. Skipping.")
                # 一時ファイルを削除
                os.unlink(temp_path)
            except Exception as e:
                print(f"Error processing known face {name}: {str(e)}")
                if os.path.exists(temp_path):
                    os.unlink(temp_path)
    
    return known_encodings

def recognize_faces_from_urls(image_urls, known_faces_urls, tolerance=0.5):
    """URLの画像から顔を認識"""
    results = []
    
    # 既知の顔のエンコーディングを読み込む
    known_encodings = load_known_faces(known_faces_urls)
    
    if not known_encodings:
        return json.dumps({"error": "No valid known faces provided"})
    
    for url in image_urls:
        temp_path = download_image_from_url(url)
        if not temp_path:
            results.append({"image": url, "error": "Failed to download image"})
            continue
        
        try:
            img = face_recognition.load_image_file(temp_path)
            face_encodings = face_recognition.face_encodings(img)
            face_locations = face_recognition.face_locations(img)
            
            if not face_encodings:
                results.append({"image": url, "name": "No face detected", "coordinates": None})
                os.unlink(temp_path)
                continue
            
            image_results = []
            
            for face_encoding, location in zip(face_encodings, face_locations):
                top, right, bottom, left = location
                x, y, width, height = left, top, right - left, bottom - top
                
                distances = face_recognition.face_distance(list(known_encodings.values()), face_encoding)
                best_match_index = np.argmin(distances) if len(distances) > 0 else None
                name = "Unknown"
                
                if best_match_index is not None and distances[best_match_index] < tolerance:
                    name = list(known_encodings.keys())[best_match_index]
                
                image_results.append({
                    "name": name,
                    "coordinates": {"x": x, "y": y, "width": width, "height": height}
                })
            
            results.append({"image": url, "faces": image_results})
            
            # 一時ファイルを削除
            os.unlink(temp_path)
            
        except Exception as e:
            results.append({"image": url, "error": str(e)})
            if os.path.exists(temp_path):
                os.unlink(temp_path)
    
    return json.dumps(results, indent=4)

# 元の関数も残しておく（ローカル実行用）
def recognize_faces(image_paths, tolerance=0.5):
    results = []

    for img_path in image_paths:
        if not os.path.exists(img_path):
            results.append({"image": img_path, "error": "File not found"})
            continue

        img = face_recognition.load_image_file(img_path)
        face_encodings = face_recognition.face_encodings(img)
        face_locations = face_recognition.face_locations(img)  # Get face coordinates

        if not face_encodings:
            results.append({"image": img_path, "name": "No face detected", "coordinates": None})
            continue

        image_results = []

        for face_encoding, location in zip(face_encodings, face_locations):
            top, right, bottom, left = location
            x, y, width, height = left, top, right - left, bottom - top  # Convert to (x, y, width, height)

            distances = face_recognition.face_distance(list(known_encodings.values()), face_encoding)
            best_match_index = np.argmin(distances) if len(distances) > 0 else None
            name = "Unknown"

            if best_match_index is not None and distances[best_match_index] < tolerance:
                name = list(known_encodings.keys())[best_match_index]

            image_results.append({
                "name": name,
                "coordinates": {"x": x, "y": y, "width": width, "height": height}
            })

        results.append({"image": img_path, "faces": image_results})

    return json.dumps(results, indent=4)

# Cloud Functions用のHTTPトリガー関数
@functions_framework.http
def recognize_faces_http(request):
    """HTTP経由で顔認識を実行するCloud Functions関数"""
    # CORSヘッダーを設定
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    
    headers = {'Access-Control-Allow-Origin': '*'}
    
    # POSTリクエストのみ処理
    if request.method != 'POST':
        return (json.dumps({'error': 'Only POST requests are accepted'}), 405, headers)
    
    try:
        request_json = request.get_json(silent=True)
        
        if not request_json:
            return (json.dumps({'error': 'No JSON data provided'}), 400, headers)
        
        # リクエストからパラメータを取得
        image_urls = request_json.get('image_urls', [])
        known_faces_urls = request_json.get('known_faces_urls', {})
        tolerance = request_json.get('tolerance', 0.5)
        
        if not image_urls:
            return (json.dumps({'error': 'No image_urls provided'}), 400, headers)
        
        if not known_faces_urls:
            return (json.dumps({'error': 'No known_faces_urls provided'}), 400, headers)
        
        # 顔認識を実行
        results = recognize_faces_from_urls(image_urls, known_faces_urls, tolerance)
        
        return (results, 200, headers)
    
    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)

if __name__ == "__main__":
    # ローカル実行時はコマンドライン引数から画像パスを取得
    image_paths = sys.argv[1:]
    
    # Dictionary of known faces with names and image paths
    known_faces = {
        "Elmer": "known_faces/elmer.jpg", # Add more images of people you'd like to recognize
    }
    
    # Load known face encodings
    known_encodings = {}
    for name, img_path in known_faces.items():
        if os.path.exists(img_path):
            img = face_recognition.load_image_file(img_path)
            encodings = face_recognition.face_encodings(img)
            if encodings:
                known_encodings[name] = encodings[0]
            else:
                print(f"Warning: No face found in {img_path}. Skipping.")
    
    print(recognize_faces(image_paths))
