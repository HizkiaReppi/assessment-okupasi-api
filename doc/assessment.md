# Assessment API Spec

## Add Assessment
Endpoint: POST /api/v1/assessment\
Login: required

Request Type: application/json

Request Body:
```json
{
  "title": "example",
  "url": "https://example1.com"
}
```

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "id": "e6314752-c753-47dc-bc82-eae480d1b094"
  }
}
```

Response Body (Failed):
```json
{
  "errors": [
    {
      "message": "Internal Server Error"
    }
  ]
}
```

## Get All Assessment
Endpoint: GET /api/v1/assessment\
Login: required

Response Body (Success):
```json
{
  "status": "success",
  "data": [
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1b094",
      "title": "example",
      "url": "https://example1.com"
    }
  ]
}
```

Response Body (Failed):
```json
{
  "errors": [
    {
      "message": "Internal Server Error"
    }
  ]
}
```

## Edit Assessment By Id
Endpoint: PUT /api/v1/assessment/{id}\
Login: required

Request Type: application/json

Request Body:
```json
{
  "title": "example",
  "url": "https://example.com"
}
```

Response Body (Success):
```json
{
  "status": "success"
}
```

Response Body (Failed):
```json
{
  "errors": [
    {
      "message": "Internal Server Error"
    }
  ]
}
```

## Delete Assessment By Id
Endpoint: DELETE /api/v1/assessment/{id}\
Login: required

Response Body (Success):
```json
{
  "status": "success"
}
```

Response Body (Failed):
```json
{
  "errors": [
    {
      "message": "Internal Server Error"
    }
  ]
}
```
