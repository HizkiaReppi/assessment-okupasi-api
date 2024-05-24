# User API Spec

## Add User
Endpoint: POST /api/v1/user\
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
