# Review API Documentation

## 1. Get Reviews

### Endpoint

GET /api/v1/events/{event_id}/reviews

### Description

Retrieves event's reviews. (host and guests can access)

### Response

```json
{
  "data": {
    "reviews": [
      {
        "id": number,
        "reviewText":"string",
        "userId": number,
        "name": "string",
        "profileImageUrl": "string"
      }
    ]
  }
}
```

## 2. Get Review images

### Endpoint

GET /api/v1/events/{event_id}/review-images

### Description

Retrieves event's review images. (host and guests can access)

### Response

```json
{
  "data": {
    "review-images": [
      "imageUrl": "string",
      "imageUrl": "string"
    ]
  }
}
```

## 3. Create a review

### Endpoint

POST /api/v1/events/{event_id}/reviews

### Description

Creates a review for an event. (only guests can post)

### Request

```json
{
  "reviewText":"string",
  "image": [
    file
  ],
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "review": {
      "id": "string",
      "reviewText": "string",
      "imageUrl1": "string",
      "imageUrl2": "string",
      "imageUrl3": "string",
      "imageUrl4": "string"
    }
  }
}
```
