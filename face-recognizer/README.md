## execute on local
```
docker compose up --build
```

### test
```
python3 test_local.py
```


## Deploy

### build
```
gcloud builds submit --config=cloudbuild.yaml .
```

### deploy
```
gcloud run deploy face-recognizer \
  --image gcr.io/leangcp-317022/face-recognizer \
  --platform managed \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 10m \
  --region us-west1
```

### commands

```
# list of cloud run
gcloud run services list

# describe
gcloud run services describe face-recognizer

# delete
gcloud run services delete face-recognizer
```


## test
### python
```
python3 test_cloudrun.py
```

### curl
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "image_urls": [
      "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741182571/Billie_Eilish_0_pligvw.jpg"
    ],
    "known_faces_urls": {
      "Biden": "https://raw.githubusercontent.com/ageitgey/face_recognition/master/examples/biden.jpg",
      "Elmer": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1731916167/qorws7mpkurpzdzlogs4.jpg",
      "Amane": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741128699/amane-1_bpyegy.jpg",
      "Billy": "https://res.cloudinary.com/dh0ywk4cn/image/upload/v1741182571/Billie_Eilish_1_ngb1p5.jpg"
    },
    "tolerance": 0.6
  }' \
  https://face-recognizer-189967247128.us-west1.run.app
