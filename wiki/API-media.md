# Media API Documentation

## 1. Get Medias

### Endpoint

GET /api/v1/events/{event_id}/medias

### Description

Retrieves event's medias. (host and guests can access)

### Response

```json
{
  "data": {
    "medias": [
      {
        "id": "string",
        "eventId": "string",
        "imageTitle": "string",
        "imageUrl": "string"
      }
    ]
  }
}
```

## 2. Create Media

### Endpoint
POST /api/v1/events/{event_id}/media

### Description

Creates a media for an event. (only host can post)

### Request

```json
{
  "imageTitle":"string",
  "image": file,
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "media": {
      "id": "string",
      "eventId": "string",
      "imageTitle": "string",
      "imageUrl": "string"
    }
  }
}
```

## 3. Delete Media

### Endpoint

DELETE /api/v1/events/{event_id}/medias/{media_id}

### Description

Deletes a media. (only host can delete)

### Response

```json
{
  "success": true,
  "message": "string"
}
```
