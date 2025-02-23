# Necessities API Documentation

## 1. Get Necessities

### Endpoint

GET /api/v1/events/{event_id}/necessities

### Description

Retrieves event's necessities. (only host can access)

### Response

```json
{
  "necessities": [
    {
      "id": "string",
      "item": "string"
    }
  ],
  "noteForNecessities": "string"
}
```

## 2. Create Necessities

### Endpoint

POST /api/v1/events/{event_id}/necessities

### Description

Create necessities for event. (only host can access)

### Request Body

```json
{
  "necessities": [
    {
      "item": "string"
    }
  ],
  "noteForNecessities": "string"
}
```

### Response

```json
{
  "success": boolean,
  "message": "string",
  "necessities": [
    {
      "id": "string",
      "item": "string",
    }
  ],
  "noteForNecessities": "string"
}
```

## 3.Update Necessities

### Endpoint

PATCH /api/v1/events/{event_id}/necessities

### Description

Updates necessities for event. (only host can access)

### Request Body

```json
{
  "necessities": [
    {
      "id": "?string",
      "item": "string"
    }
  ]
}
```

### Response

```json
{
  "success": boolean,
  "message": "string",
  "necessities": [
    {
      "id": "string",
      "item": "string",
    }
  ],
  "noteForNecessities": "string"
}
```

## 4. Delete Necessity

### Endpoint

DELETE /api/v1/events/{event_id}/necessities

### Description

Deletes necessity for event. (only host can access)
Should handle by Frontend. (either delete or update)

### Response

```json
{
  "success": boolean,
  "message": "string"
}
```

## 5. GET Guests Necessities

### Endpoint

GET /api/v1/events/{event_id}/me/necessities

### Description

Retrieves logged-in user's necessities for event. (only guests can access)

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| event_id  | string | Yes      | Event ID    |

### Response

```json
{
  "success": boolean,
  "message": "string",
  "necessities": [
    {
      "id": "string",
      "item": "string",
    }
  ],
  "noteForNecessities": "string"
}
```

## 6. Switch Necessity Added Status (only guests can access)

### Endpoint

PATCH /api/v1/events/{event_id}/me/necessities/{necessity_id}

### Description

Updates logged-in user's necessity for event.

### Request Body

```json
{
  "isAdded": boolean
}
```

### Response

```json
{
  "success": boolean,
  "message": "string",
  "necessity": {
    "id": "string",
    "item": "string",
    "isAdded": boolean
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
