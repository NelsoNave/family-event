# Guest API Documentation

## 1. Get Event Participants

### Endpoint

GET /api/v1/events/{event_id}/participants

### Description

Retrieves all participants for selected event.

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| event_id  | string | Yes      | Event ID    |

### Response

```json
{
    "acceptedParticipants": [
        {
        "id": "string",
        "name": "string",
        "profileImageUrl": "string",
        "isAttended": boolean
        }
    ],
    "declinedParticipants": [
        {
        "id": "string",
        "name": "string",
        "profileImageUrl": "string",
        "isAttended": boolean
        }
    ],
    "tmpParticipants": [
        {
        "id": "string",
        "name": "string",
        "isAttended": boolean
        }
    ]
}
```

## 2. Update Participant Attendance

### Endpoint

PATCH /api/v1/events/{event_id}/participants/{participant_id}/attendance

### Description

Updates the attendance status of a specific participant. (only host can access)

### Path Parameters

| Parameter      | Type   | Required | Description    |
| -------------- | ------ | -------- | -------------- |
| event_id       | string | Yes      | Event ID       |
| participant_id | string | Yes      | Participant ID |

### Request Body

```json
{
  "isAttended": boolean
}
```

### Response

```json
{
  "success": boolean,
  "message": "string",
}
```

## 3. Delete Participant

### Endpoint

DELETE /api/v1/events/{event_id}/participants/{participant_id}

### Description

Removes a participant from the event. (only host can access)

### Path Parameters

| Parameter      | Type   | Required | Description    |
| -------------- | ------ | -------- | -------------- |
| event_id       | string | Yes      | Event ID       |
| participant_id | string | Yes      | Participant ID |

### Response

```json
{
  "success": boolean,
  "message": "string"
}
```

## 4. Add temporary participant

### Endpoint

POST /api/v1/events/{event_id}/participants/temporary

### Description

Adds a temporary participant to the event. (only host can access)

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| event_id  | string | Yes      | Event ID    |

### Request Body

```json
{
  "name": "string"
}
```

### Response

```json
{
  "success": boolean,
  "message": "string"
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
