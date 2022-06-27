# Simple-CRUD-API

## Instruction
1. `git clone https://github.com/erjigit17/Simple-CRUD-API`
2. `git checkout dev`
3. .env_example rename to .env
4. `npm i`
5. `npm run lint`
6. `npm run start:dev` or `npm run start:prod`
7. `npm run kill`  to kill server on port 4000. If faced `Error: listen EADDRINUSE: address already in use :::4000`
8. `npm run  start:multi` use several different browsers at the same time, and watch the messages in the terminal
9. `npm run test` 12 cases, grouped by http methods

## Attention!
###You can test only when the server is running!

Test start on another terminal. For example:

Terminal 1.
Start app: `npm run  start:multi`

Terminal 2.
Start test: `npm run test`

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
  "age": 26,
  "hobbies": []
}
```
Response: `200 OK`
```json
{
  "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
  "name": "John",
  "age": 26,
  "hobbies": []
}
````
#### GET localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
Response: `200 OK`
```json
{
  "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
  "name": "John",
  "age": 26,
  "hobbies": []
}
```
#### GET localhost:4000/api/v1/users
Response: `200 OK`

```json
[
  {
    "id": "4815d3af-7534-4758-a75b-0f6269229dcc",
    "name": "John",
    "age": 26,
    "hobbies": []
  }
]
```
#### DELETE localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
Response: `204 No Content`

## Test invalid uuid
#### GET localhost:4000/api/v1/users/12345
Response: `400 Bad Request`

```json
{
  "message": "userId invalid, not a valid uuid"
}
```
## Test not found
#### DELETE localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
#### GET localhost:4000/api/v1/users/4815d3af-7534-4758-a75b-0f6269229dcc
Response: `404 Not Found`
```json
{
  "message": "User not found"
}
```
## Test invalid body
#### POST localhost:4000/api/v1/users
body:
```json
{
  "age": 42,
  "hobbies": []
}
```
Response: `400 Bad Request`
```json
{
  "message": "Request body does not contain required fields"
}
```
## Test invalid JSON
#### POST localhost:4000/api/v1/users
body:
```
{
  "age": 42,
  "hobbies": [
    "Hiking", "Reading"
```
Response: `400 Bad Request`
```json
{
  "message": "Bad request error: Invalid JSON"
}
```
## Test invalid types
#### POST localhost:4000/api/v1/users
body:
```json
{
  "name": "John",
  "age": "26",
  "hobbies": []
}
```
Response: `400 Bad Request`
```json
{
  "message": "Bad request error: Property \"age\" is not of type: number"
}
```