# Sekolah API Spec

## Add Sekolah
Endpoint: POST /api/v1/sekolah\
Login: required

Request Type: application/json

Request Body:
```json
{
  "nama": "example",
  "kota": "example"
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

## Get All Sekolah
Endpoint: GET /api/v1/sekolah\
Login: required

Query Param:
- key: search\
  type: number\
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
      "kota": "EXAMPLE"
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

## Get Sekolah By Id
Endpoint: GET /api/v1/sekolah/{id}\
Login: required

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "id": "e6314752-c753-47dc-bc82-eae480d1b094",
    "nama": "EXAMPLE",
    "kota": "EXAMPLE"
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

## Edit Sekolah By Id
Endpoint: PUT /api/v1/sekolah/{id}\
Login: required

Request Type: application/json

Request Body:
```json
{
    "nama": "EXAMPLE",
    "kota": "EXAMPLE"
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

## Delete Sekolah By Id
Endpoint: DELETE /api/v1/sekolah/{id}\
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

## Add Kompetensi
Endpoint: POST /api/v1/sekolah/{id}/kompetensi\
Login: required

Request Type: application/json

Request Body:
```json
{
  "kode": "010000",
  "unit_kompetensi": [
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1b094"
    }
  ]
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

## Get All Kompetensi
Endpoint: GET /api/v1/sekolah/{id}/kompetensi\
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
      "nama": "example",
      "unit_kompetensi": [
        {
          "id": "e6314752-c753-47dc-bc82-eae480d1b094",
          "nama": "example"
        }
      ]
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

## Edit Kompetensi
Endpoint: PUT /api/v1/sekolah/{id}/kompetensi\
Login: required

Request Type: application/json

Request Body:
```json
{
  "kode": "010000",
  "unit_kompetensi": [
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1b094"
    },
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1bcxc"
    }
  ]
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

## Delete Kompetensi By Id
Endpoint: DELETE /api/v1/sekolah/{id}/kompetensi/{idKompetensi}\
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

## Get All Sekolah Stat By Kode Okupasi
Endpoint: GET /api/v1/sekolah/stat/okupasi/{kode}\

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
      "kota": "EXAMPLE",
      "kecocokan": "100%",
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
