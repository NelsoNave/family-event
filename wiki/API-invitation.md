# Things To Buy API Documentation

## 1. Create Event

### Endpoint

POST /api/v1/event

### Description

Create a event.

### Request

```json
{
    "event":{
        "title": "String",
        "thumbnailUrl": file,
        "startTime" : "string",
        "endTime" : "string",
        "country" : "string",
        "postalCode" : "string",
        "province" : "string",
        "city" : "string",
        "address1" : "string",
        "address2" : "string",
        "isAskRestrictions": Boolean,
        "theme" : "string",
        "noteForThingsToBuy" : "string",
        "noteForNecessities" : "string",
        "budget": number
      }
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
        "country" : "string",
        "postalCode" : "string",
        "province" : "string",
        "city" : "string",
        "address1" : "string",
        "address2" : "string",
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
