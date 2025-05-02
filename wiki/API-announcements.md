# Announcements API Documentation

## 1. Get Announcements

### Endpoint

GET /api/v1/events/{event_id}/announcements

### Description

Retrieves event's announcements. (host and guests can access)

### Response

```json
{
  "data": {
    "announcements": [
      {
        "id": number,
        "contentText": "string",
        "imageUrl": "string"
        "isEmailSent": Boolean,
        "timeAgo": "string",
        "hostId": number,
        "host":{
          "name": "string",
          "profileImageUrl": "string"
            }
        "countFavorite": number,
        "countMessage": number,
        "hasFavorited" : Boolean
        }
    ]
  }
}
```

## 2. Get replies for an announcement

### Endpoint

GET /api/v1/events/{event_id}/announcements/{announcement_id}

### Description

Retrieves replies for an announcement. (host and guests can access)

### Response

```json
{
  "data": {
    "announcement":
      {
        "id": number,
        "contentText": "string",
        "imageUrl": "string"
        "isEmailSent": Boolean,
        "timeAgo": "string",
        "hostId": number,
        "host":{
          "name": "string",
          "profileImageUrl": "string"
            }
        "replies"[
            {
            "reply_text": "string",
            "timeAgo": "string",
            "isOwnReply": Boolean,
            "user":{
                "name": "string",
                "profileImageUrl": "string"
                }
            }
          ]
            "countFavorite": number,
            "countMessage": number,
            "hasFavorited" : Boolean
        }
  }
}
```


## 3. Create a announcement

### Endpoint

POST /api/v1/events/{event_id}/announcements

### Description

Creates a announcement for an event. (only host can post)

### Request

```json
{
  "contentText":"string",
  "email_flag": Boolean,
  "image": {file}
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "announcement": {
      "id": "string",
      "contentText": "string",
      "imageUrl": "string",
      "isEmailSent": Boolean,
    }
  }
}
```

## 4. Update a announcement

### Endpoint

PATCH /api/v1/events/{event_id}/announcements/{announcement_id}

### Description

Update a announcement for an event. (only host can update)

### Request

```json
{
  "contentText":"string",
  "removeImage": Boolean,
  "image": {file}
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "announcement": {
      "id": "string",
      "contentText": "string",
      "imageUrl": "string",
      "isEmailSent": Boolean,
    }
  }
}
```

## 5. Sent a notification emails

### Endpoint

PATCH /api/v1/events/{event_id}/announcements/{announcement_id}/notification

### Description

Send notification emails to guests.
Update isEmailSent flag to true. (only host can update)

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "announcement": {
      "id": "string",
      "contentText": "string",
      "imageUrl": "string",
      "isEmailSent": Boolean,
    }
  }
}
```

## 6. Delete a announcement

### Endpoint

DELETE /api/v1/events/{event_id}/announcements/{announcement_id}

### Description

Delete a announcement and replies. (only host can update)

### Response

```json
{
  "success": true,
  "message": "string"
}
```

## 7. Create a reply

### Endpoint

POST /api/v1/events/{event_id}/announcements/{announcement_id}/reply

### Description

Creates a reply for a announcement. (only guests can post)

### Request

```json
{
  "replyText": "string"
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "announcement": {
      "id": "string",
      "contentText": "string",
      "imageUrl": "string",
      "isEmailSent": Boolean,
    }
  }
}
```

## 8. Create a favorite and remove a favorite

### Endpoint

POST /api/v1/events/{event_id}/announcements/{announcement_id}/favorite

### Description

Creates a reply for a announcement. (only guests can post)

### Request

```json
{
  "favorite": Boolean
}
```

### Response

```json
{
  "success": true,
  "message": "string"
}
```

## 9. Delete a reply

### Endpoint

DELETE /api/v1/events/{event_id}/announcements/{announcement_id}/reply/{reply_id}

### Description

Delete a reply for a announcement. (only guests can delete)

### Response

```json
{
  "success": true,
  "message": "string"
}
```
## Notes

- is_message flag means this record is a reply message or not.(to verify this record for a reply or a favorite.)
- is_favorite flag means guests liked a announcement or not.
