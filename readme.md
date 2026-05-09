# Task Manager Application

## Overview
Task Manager is a full stack web application developed to manage daily tasks efficiently. Users can add, update, delete, and filter tasks based on completion status and priority levels. The application includes frontend-backend integration using REST APIs and provides a responsive user interface.

## Features
- Add, update, and delete tasks
- Mark tasks as completed or pending
- Set task priority (Low, Medium, High)
- Filter tasks by status and priority
- Real-time task statistics
- REST API integration

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQL

## Project Structure

```bash
TASK-MANAGER/
├── backend/
├── frontend/
├── schema.sql
├── seed.sql
└── package.json
```

## Installation & Setup

```bash
cd backend
npm install
node server.js
```

Configure the `.env` file for database connection and run `schema.sql` and `seed.sql` before starting the application.

Open `frontend/index.html` in your browser to run the frontend.

## API Endpoints
- GET `/tasks` → Fetch all tasks
- POST `/tasks` → Create task
- PUT `/tasks/:id` → Update task
- DELETE `/tasks/:id` → Delete task

## Learning Outcomes
- CRUD Operations
- REST API Development
- Frontend & Backend Integration
- Async JavaScript
- SQL Database Handling

## Author
Renu Joshi