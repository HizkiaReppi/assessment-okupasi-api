# Okupasi API Spec

## Add Okupasi
Endpoint: POST /api/v1/okupasi\
Login: required

Request Type: application/json

Request Body:
```json
{
  "kode": "010000",
  "nama": "example",
  "unit_kompetensi": [
    {
      "nama": "example"
    }
  ]
}
```

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "kode": "010000"
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

## Get All Okupasi
Endpoint: GET /api/v1/okupasi\
Login: required

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
      "kode": "010000",
      "nama": "example"
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

## Get Okupasi By Kode
Endpoint: GET /api/v1/okupasi/{kode}\
Login: required

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "kode": "010000",
    "nama": "example",
    "unit_kompetensi": [
      {
        "id": "e6314752-c753-47dc-bc82-eae480d1b094",
        "nama": "example"
      }
    ]
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

## Edit Okupasi By Kode
Endpoint: PUT /api/v1/okupasi/{kode}\
Login: required

Request Type: application/json

Request Body:
```json
{
  "kode": "010000",
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

## Delete Okupasi By Kode
Endpoint: DELETE /api/v1/okupasi/{kode}\
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

## Add Unit Kompetensi
Endpoint: POST /api/v1/okupasi/{kode}/unit-kompetensi\
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

## Edit Unit Kompetensi By Id
Endpoint: PUT /api/v1/okupasi/{kode}/unit-kompetensi/{id}\
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

## Delete Unit Kompetensi By Id
Endpoint: DELETE /api/v1/okupasi/{kode}/unit-kompetensi/{id}\
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
