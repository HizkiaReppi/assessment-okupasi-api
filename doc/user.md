# User API Spec

## Add User
Endpoint: POST /api/v1/user\
*super only\
Login: required

Request Type: application/json

Request Body:
```json
{
  "nama": "example",
  "email": "example1@gmail.com",
  "password": "12345678"
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

## Get All User
Endpoint: GET /api/v1/user\
*super only\
Login: required

Response Body (Success):
```json
{
  "status": "success",
  "data": [
    {
      "id": "e6314752-c753-47dc-bc82-eae480d1b094",
      "nama": "example",
      "email": "example1@gmail.com",
      "is_super": true,
      "created_at": "2024-04-07T06:53:09.538Z",
      "updated_at": "2024-04-07T06:53:09.538Z"
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

## Delete Admin By Id
Endpoint: DELETE /api/v1/user/{id}\
*super only\
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

## Login
Endpoint: POST /api/v1/user/login

Request Type: application/json

Request Body:
```json
{
  "email": "example@gmail.com",
  "password": "12345678"
}
```
Response Cookie:
- Authorization: Bearer%20<token>
- r: Bearer%20<token>

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

## Logout
Endpoint: POST /api/v1/user/logout\
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

## Change Email
Endpoint: PATCH /api/v1/user/email\
Login: required

Request Type: application/json

Request Body:
```json
{
  "email": "example@gmail.com"
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

## Change Password
Endpoint: PATCH /api/v1/user/password\
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
