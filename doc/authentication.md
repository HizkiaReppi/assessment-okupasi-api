# Authentication API Spec

## Refresh Token
Endpoint: PUT /api/v1/authentication/refresh\
Login: required

Response Body (Success):
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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