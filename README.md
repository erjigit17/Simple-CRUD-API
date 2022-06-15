# Simple-CRUD-API

## Instruction
1. git clone https://github.com/erjigit17/Simple-CRUD-API
2. git checkout dev
3. .env_example rename to .env
4. npm i
5. npm run lint
6. npm run start:dev (or start:prod)
7. npm run test

##Postman tests:

#### POST localhost:4000/api/v1/users
body:
```json
{
  "name": "User",
  "age": 42,
  "hobbies": [
    "Hiking", "Reading"
  ]
}
```
Response: `201 Created`
```json
{
  "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
  "name": "User",
  "age": 42,
  "hobbies": [
    "Hiking", "Reading"
  ]
}
```
#### PUT localhost:4000/api/v1/users
body:
```json
{
  "name": "John",
  "age": 26
}
```
Response: `200 OK`
```json
{
    "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
    "name": "John",
    "age": 26
}
````
#### GET localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
Response: `200 OK` 
```json
{
  "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
  "name": "John",
  "age": 26
}
```
#### GET localhost:4000/api/v1/users
Response: `200 OK`

```json
[
  {
    "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
    "name": "John",
    "age": 26
  }
]
```
#### DELETE localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc 
Response: `204 No Content`

## Tests invalid uuid
#### GET localhost:4000/api/v1/users/12345
Response: `400 Bad Request`

```json
{
  "message": "userId invalid, not a valid uuid"
}
```
## Tests not found
#### DELETE localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
#### GET localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
Response: `404 Not Found`
```json
{
    "message": "User not found"
}
```
## Tests invalid body
#### POST localhost:4000/api/v1/users
body:
```json
{
  "age": 42,
  "hobbies": [
    "Hiking", "Reading"
  ]
}
```
Response: `400 Bad Request`
```json
{
    "message": "Request body does not contain required fields"
}
```