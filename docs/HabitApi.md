# Habit API Documentation (Postman Testing)
🔹 Base URL
``` http://localhost:4000/api/habits ```
* Create Habit

Endpoint
POST /create

Description

Creates a new habit for a user.
Max 3 habits per type per user

Request Body (JSON)
{
  "habitName": "Drink Water",
  "type": "health",
  "userId": "123456789"
} 

### Success Response (201)
{
  "_id": "habit_id",
  "habitName": "Drink Water",
  "type": "good",
  "userId": "123456789",
  "logs": [],
  "createdAt": "2026-04-29T10:00:00.000Z"
}
### Error Response (400)
{
  "success": false,
  "message": "Max 3 habits allowed"
}


Method: POST
URL: http://localhost:4000/api/habits/create
Body → raw → JSON
* Log Habit (Mark Complete / Incomplete)
Endpoint
PUT /log/:habitId
Description

Marks a habit as completed or not for today's date

URL Example
```  http://localhost:4000/api/habits/log/662f1a2b3c4d```

Request Body (JSON)
{
  "completed": true
}
Success Response (200)

{
  "_id": "habit_id",
  "habitName": "Drink Water",
  "logs": [
    {
      "date": "2026-04-29",
      "completed": true
    }
  ]
}

Notes
If today's log exists → it updates
If not → creates a new log entry
Postman Setup
Method: PUT
URL: http://localhost:4000/api/habits/log/:habitId
Replace :habitId with actual ID
Body → raw → JSON
* Get All Habits for User
Endpoint
GET /:userId
Description

Fetch all habits for a specific user

URL Example
http://localhost:4000/api/habits/123456789
Success Response (200)
[
  {
    "_id": "habit_id",
    "habitName": "Drink Water",
    "type": "health",
    "userId": "123456789",
    "logs": []
  }
]
Postman Setup
Method: GET
URL: http://localhost:4000/api/habits/:userId