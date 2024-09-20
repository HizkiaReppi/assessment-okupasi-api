# Konsentrasi API Spec

## Add Konsentrasi
Endpoint: POST /api/v1/konsentrasi\
Login: required

Request Type: application/json

Request Body:
```json
{
  "nama": "example"
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

## Get All Konsentrasi
Endpoint: GET /api/v1/konsentrasi\

Query Param:
- key: search\
  type: string\
  required: false
- key: limit\
  type: number\
  required: false
- key: page\
  type: number\
  required: false

Response Body (Success):
```json
{
  "status": "success",
  "limit": 10,
  "total_page": 1,
  "total_result": 1,
  "page": 1,
  "data": [
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1b094",
      "nama": "EXAMPLE",
      "total_sekolah": 10
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

## Edit Konsentrasi By Id
Endpoint: PUT /api/v1/konsentrasi/{id}\
Login: required

Request Type: application/json

Request Body:
```json
{
  "nama": "example"
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

## Delete Konsentrasi By Id
Endpoint: DELETE /api/v1/konsentrasi/{id}\
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
