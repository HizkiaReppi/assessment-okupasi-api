# Sekolah API Spec

## Add Sekolah
Endpoint: POST /api/v1/sekolah\
Login: required

Request Type: application/json

Request Body:
```json
{
  "nama": "example",
  "kota": "example",
  "jumlah_siswa": 100,
  "jumlah_kelulusan": 90
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
      "kota": "EXAMPLE",
      "jumlah_siswa": 100,
      "jumlah_kelulusan": 90,
      "persentase_kelulusan": "90%"
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

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "id": "e6314752-c753-47dc-bc82-eae480d1b094",
    "nama": "EXAMPLE",
    "kota": "EXAMPLE",
    "jumlah_siswa": 100,
    "jumlah_kelulusan": 90,
    "persentase_kelulusan": "90%"
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
    "kota": "EXAMPLE",
    "jumlah_siswa": 100,
    "jumlah_kelulusan": 90
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
          "kode_unit": "k213.213",
            "nama": "example 1",
            "standard_kompetensi": "example"
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

## Delete Kompetensi By Kode Okupasi
Endpoint: DELETE /api/v1/sekolah/{id}/kompetensi/okupasi/{kode}\
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

## Delete Kompetensi By Id
Endpoint: DELETE /api/v1/sekolah/{id}/kompetensi/unit/{idUnit}\
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
      "jumlah_siswa": 100,
      "jumlah_kelulusan": 90,
      "persentase_kelulusan": "90%",
      "kecocokan": "100%",
      "okupasi": {
        "kode": "1238901",
        "nama": "EXAMPLE",
        "unit_kompetensi": [
          {
            "id": "e6314752-c753-47dc-bc82-eae480d1b094",
            "kode_unit": "k213.213",
            "nama": "EXAMPLE 1",
            "standard_kompetensi": "example"
          }
        ]
      }
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
