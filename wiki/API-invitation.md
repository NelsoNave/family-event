# Invitation API Documentation

## 1. Create Event

### Endpoint

POST /api/v1/events

### Description

Create a event.

### Request

```json
{
    "event":{
        "title": "string",
        "startTime" : "string",
        "endTime" : "string",
        "address" : "string",
        "latitude" : "float",
        "longitude" : "float",
        "isAskRestrictions": Boolean,
        "theme" : "string",
      },
      "thumbnail": file
}
```

### Response

```json
{
  "success": true,
  "message": "string",
  "data": {
    "event":{
        "id": number,
        "hostId": number,
        "title": "String",
        "thumbnailUrl": "string",
        "startTime" : "string",
        "endTime" : "string",
        "address" : "string",
        "latitude" : "float",
        "longitude" : "float",
        "isAskRestrictions": Boolean,
        "theme" : "string",
        "noteForThingsToBuy" : "string",
        "noteForNecessities" : "string",
        "budget": number
      }
  }
}
```

### Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

## Notes

- All API responses are returned in JSON format
