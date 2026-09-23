Build a complete, fully functional full-stack web application called **TeamTask**.

This is a **team task management system** for students/teams to create teams, assign tasks, track deadlines, monitor progress, and manage completed and pending work.

IMPORTANT: This must be a REAL WORKING APPLICATION, not a static website or UI prototype. All important functionality must be connected to a database and work end-to-end.

Do not stop after creating the landing page or dashboard. Build the entire application.

---

# 1. REQUIRED TECHNOLOGY STACK

Use the following stack:

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Development Tool

* Visual Studio Code

### Browser

* Chrome
* Microsoft Edge

Use a clean and maintainable project structure.

Do not replace MySQL with a different database unless absolutely required by the development environment. The intended database is MySQL.

---

# 2. CORE FUNCTIONAL REQUIREMENTS

The application must support all of the following:

1. User registration and login.
2. Create and manage teams.
3. Add/manage team members.
4. Create tasks.
5. Assign tasks to team members.
6. Set task deadlines.
7. Update task status.
8. View pending tasks.
9. View completed tasks.
10. Receive deadline reminders.
11. Track team member progress.
12. Search tasks.
13. Filter tasks.
14. View tasks and deadlines on a dashboard.

Every requirement above must actually work.

---

# 3. USER AUTHENTICATION

Create a complete authentication system.

## Registration

Create a registration page with:

* Full Name
* Email
* Password
* Confirm Password
* Register button

Validation:

* All required fields must be completed.
* Email must have a valid format.
* Email must be unique.
* Password and confirmation must match.
* Password must meet reasonable security requirements.

Passwords must NEVER be stored as plaintext.

Hash passwords securely on the backend.

## Login

Create a login page with:

* Email
* Password
* Login button
* "Remember me" option if appropriate

After successful login, redirect the user to the dashboard.

Include:

* Logout
* Protected pages
* Authentication middleware
* Proper unauthorized-access handling

A user who is not logged in must not be able to access protected application pages.

---

# 4. USER PROFILE

Create a profile/settings page.

Display:

* Name
* Email
* Account creation date

Allow the user to update their name.

Do not allow users to access or modify another user's private account information.

---

# 5. APPLICATION LAYOUT

After login, use a professional dashboard-style layout.

Create a sidebar/navigation containing:

* Dashboard
* My Tasks
* Teams
* Calendar
* Notifications
* Profile
* Logout

On mobile devices, convert the sidebar into an appropriate responsive navigation/menu.

At the top of the application display:

* TeamTask logo/name
* Current user
* Notification icon
* Profile/menu

---

# 6. DASHBOARD

The dashboard is the main page after login.

Create a clean, modern dashboard.

Display summary cards:

### Total Tasks

Number of tasks visible to the current user.

### To Do

Number of tasks with status "To Do".

### In Progress

Number of tasks with status "In Progress".

### Completed

Number of tasks with status "Completed".

### Overdue

Number of incomplete tasks whose deadline has passed.

These numbers must be calculated from actual database data.

Do NOT hardcode statistics.

---

## Dashboard Task Section

Display:

### My Tasks

Show the user's assigned tasks.

Each task should display:

* Task title
* Team
* Priority
* Status
* Deadline
* Assigned person

---

## Upcoming Deadlines

Show upcoming tasks ordered by deadline.

Clearly identify:

* Due today
* Due soon
* Overdue
* Completed

---

## Team Progress

Display progress for teams the current user belongs to.

Show:

* Team name
* Total tasks
* Completed tasks
* Completion percentage

Use progress bars or simple charts.

Calculate:

Completion Percentage =
Completed Tasks / Total Tasks × 100

If there are zero tasks, display 0% instead of causing a calculation error.

---

# 7. TEAM MANAGEMENT

Create a Teams page.

Users should be able to:

### Create Team

Form:

* Team Name
* Team Description

The logged-in user becomes the team owner.

---

## Team Details

When opening a team, display:

* Team name
* Description
* Team owner
* Members
* Number of tasks
* Completed tasks
* Pending tasks
* Team completion percentage

---

# 8. TEAM MEMBERS

Team owners/admins should be able to add team members.

Provide a simple interface to add a user by email.

When adding a member:

* Verify that the user exists.
* Prevent duplicate membership.
* Associate the user with the team.

Team owners should be able to remove members.

Do not allow unauthorized users to modify team membership.

---

# 9. TASK MANAGEMENT

Create a complete task management system.

Each task must contain:

* ID
* Title
* Description
* Team
* Assigned user
* Created by
* Priority
* Status
* Deadline
* Created date
* Updated date

---

# 10. TASK STATUS

The task status must have exactly these three options:

* To Do
* In Progress
* Completed

Users should be able to change task status according to their permissions.

Example workflow:

To Do → In Progress → Completed

When a task is marked Completed, the dashboard and progress statistics must update accordingly.

---

# 11. TASK PRIORITY

Implement:

* Low
* Medium
* High
* Urgent

Display priority clearly in task cards/table.

---

# 12. CREATE TASK

Create a "Create Task" button.

Open a professional form/modal containing:

* Task Title
* Description
* Team
* Assign To
* Priority
* Status
* Deadline

Validate all required fields.

The task must be saved to MySQL.

After creation, update the relevant task lists/dashboard.

---

# 13. EDIT TASK

Authorized users should be able to edit:

* Title
* Description
* Assigned user
* Priority
* Status
* Deadline

Save changes to MySQL.

---

# 14. DELETE TASK

Authorized users should be able to delete tasks.

Before deletion, display a confirmation message:

"Are you sure you want to delete this task?"

Only authorized users should be allowed to delete tasks.

---

# 15. TASK DETAILS

Create a task details view.

Display:

* Title
* Description
* Team
* Assigned user
* Created by
* Priority
* Status
* Deadline
* Created date
* Last updated

Show a clear deadline indicator.

Examples:

* Completed
* Due today
* Due tomorrow
* Due soon
* Overdue

---

# 16. MY TASKS

Create a dedicated "My Tasks" page.

Display tasks assigned to the current user.

Create filters/tabs:

* All
* To Do
* In Progress
* Completed
* Overdue

Allow sorting by:

* Deadline
* Priority
* Status
* Recently updated

---

# 17. SEARCH

Implement real task searching.

Search should work by:

* Task title
* Task description

Search results must come from actual application data.

Show:

"No tasks found"

when there are no results.

---

# 18. FILTERING

Implement task filters:

* Team
* Status
* Priority
* Assigned user
* Deadline
* Completed/Pending

Allow filters to be combined.

Include:

"Clear Filters"

button.

---

# 19. CALENDAR

Create a Calendar page.

Display tasks according to their deadlines.

Users should be able to:

* Navigate between months.
* View tasks on dates.
* Click a task.
* Open task details.

Clearly indicate completed and overdue tasks.

---

# 20. DEADLINE REMINDERS

Create an in-app notification/reminder system.

Generate reminders for:

* Tasks due soon.
* Tasks due today.
* Overdue tasks.

Create a Notifications page.

Each notification should contain:

* Notification message
* Related task
* Date/time
* Read/unread state

Allow users to mark notifications as read.

Use the database to store notifications.

If external email sending is not configured, DO NOT pretend that emails are being sent.

Implement working in-app notifications and structure the backend so email functionality can be added later.

---

# 21. TEAM MEMBER PROGRESS

Create a team progress section.

For each team member show:

* Name
* Assigned tasks
* To Do tasks
* In Progress tasks
* Completed tasks
* Completion percentage

Example:

Mohammed
Assigned: 10
Completed: 7
In Progress: 2
To Do: 1
Progress: 70%

All values must be calculated from real database records.

---

# 22. DATABASE

Use MySQL.

Create the database schema.

At minimum create these tables:

## users

Fields:

* id
* name
* email
* password_hash
* created_at
* updated_at

## teams

Fields:

* id
* name
* description
* owner_id
* created_at
* updated_at

## team_members

Fields:

* id
* team_id
* user_id
* role
* joined_at

## tasks

Fields:

* id
* team_id
* title
* description
* assigned_to
* created_by
* priority
* status
* deadline
* created_at
* updated_at

## notifications

Fields:

* id
* user_id
* task_id
* type
* message
* is_read
* created_at

Use:

* Primary keys
* Foreign keys
* Appropriate indexes
* Unique constraints
* NOT NULL constraints where appropriate

Maintain proper relationships between tables.

---

# 23. DATA ACCESS AND SECURITY

The backend must enforce authorization.

A user must only be able to access:

* Their own account.
* Teams they belong to.
* Tasks belonging to those teams.
* Tasks assigned to them.

Team owners/admins may have additional permissions.

Do not rely only on frontend checks.

Every protected backend endpoint must verify authentication and authorization.

Use parameterized queries/prepared statements to prevent SQL injection.

Validate incoming data on the backend.

Do not expose passwords or password hashes through API responses.

---

# 24. API

Create a clean REST API.

Authentication:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

User:

GET /api/users/me
PUT /api/users/me

Teams:

GET /api/teams
POST /api/teams
GET /api/teams/:id
PUT /api/teams/:id
DELETE /api/teams/:id

Members:

POST /api/teams/:id/members
DELETE /api/teams/:id/members/:userId

Tasks:

GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id

Notifications:

GET /api/notifications
PUT /api/notifications/:id/read

Use appropriate HTTP status codes and meaningful JSON responses.

---

# 25. ERROR HANDLING

Implement proper error handling.

Examples:

* Invalid login
* Invalid registration
* Duplicate email
* Team not found
* Task not found
* Unauthorized action
* Invalid deadline
* Invalid task status
* Database failure

Display user-friendly error messages.

Never expose database credentials, stack traces, or sensitive backend information to users.

---

# 26. RESPONSIVE DESIGN

The application must be responsive.

Test layouts for:

* Desktop
* Laptop
* Tablet
* Mobile

Make sure:

* Forms fit mobile screens.
* Tables remain usable.
* Dashboard cards stack properly.
* Navigation works on mobile.
* Buttons are easy to tap.
* Text does not overflow.

---

# 27. UI DESIGN

Make the interface look like a modern professional productivity application.

Use:

* Clean typography
* Consistent spacing
* Cards
* Rounded corners
* Subtle shadows
* Clear buttons
* Consistent status badges
* Professional dashboard
* Responsive layouts
* Accessible form labels
* Loading states
* Error states
* Empty states

Do not make it look like a generic AI-generated template.

Avoid unnecessary animations.

Prioritize usability.

---

# 28. EMPTY STATES

Create proper empty states.

Examples:

If there are no teams:

"You haven't joined any teams yet."

Button:

"Create Team"

If there are no tasks:

"No tasks found."

If there are no notifications:

"You're all caught up."

---

# 29. DEMO DATA

Create a database seed script.

Include realistic demo data:

* 4–6 users
* 2–3 teams
* Multiple members
* 15–20 tasks
* Mixture of To Do, In Progress and Completed
* Different priorities
* Different deadlines
* Some overdue tasks
* Some upcoming tasks

Create demo login credentials and document them in the README.

Do not use real people's personal information.

---

# 30. PROJECT STRUCTURE

Keep the code organized and easy to understand.

Use a structure similar to:

project-root/

frontend/
index.html
login.html
register.html
dashboard.html
tasks.html
teams.html
calendar.html
notifications.html
profile.html
css/
js/

backend/
server.js
routes/
controllers/
middleware/
services/
config/

database/
schema.sql
seed.sql

.env.example
README.md
package.json

You may adjust the exact structure if a better architecture is appropriate, but keep frontend, backend, and database responsibilities separated.

---

# 31. ENVIRONMENT VARIABLES

Create a `.env.example`.

Include placeholders for:

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
JWT_SECRET=

Never hardcode real secrets.

---

# 32. README

Create a complete README.md.

Include:

* Project overview
* Features
* Technology stack
* Requirements
* Installation
* MySQL database setup
* Environment configuration
* How to run backend
* How to run frontend
* How to seed database
* Demo accounts
* API endpoints
* Project structure

Make the instructions simple enough for a student to follow in VS Code.

---

# 33. NON-FUNCTIONAL REQUIREMENTS

The application must satisfy:

### Easy to use

Navigation and functionality should be intuitive.

### Secure login

Use password hashing and protected authentication.

### Fast response

Avoid unnecessary database queries and optimize common queries.

### Reliable data storage

Use MySQL with proper constraints and relationships.

### Easy to maintain

Use modular code and clear project structure.

---

# 34. IMPORTANT: DO NOT CREATE A FAKE DEMO

This is critical.

Do NOT use:

* Hardcoded dashboard statistics.
* Fake tasks stored only in JavaScript.
* Fake users.
* Fake authentication.
* Buttons that do nothing.
* Fake notifications.
* Static progress percentages.

All application data must be stored/retrieved from MySQL.

Authentication must be real.

Task creation must be real.

Team creation must be real.

Task assignment must be real.

Status changes must be real.

Search must work.

Filtering must work.

Dashboard statistics must use database data.

---

# 35. FINAL TESTING

Before declaring the project finished, test the application end-to-end.

Perform this exact test:

1. Register a new account.
2. Log in.
3. Create a team.
4. Add another registered user to the team.
5. Create a task.
6. Assign the task to the team member.
7. Set a deadline.
8. Verify the task appears on the dashboard.
9. Change the task from To Do to In Progress.
10. Change it from In Progress to Completed.
11. Verify dashboard statistics update.
12. Verify team progress updates.
13. Test search.
14. Test filters.
15. Test calendar.
16. Test notifications.
17. Test logout.
18. Attempt unauthorized access to another team's data.
19. Verify unauthorized access is blocked.
20. Test responsive layout.

Fix any errors discovered during testing.

---

# 36. FINAL INSTRUCTION

Build the complete application now.

Do not merely explain how to build it.

Do not give me a tutorial instead of building it.

Do not stop at a frontend prototype.

Create the actual working full-stack TeamTask application with:

HTML + CSS + JavaScript frontend
+
Node.js + Express backend
+
MySQL database
+
Authentication
+
Teams
+
Team members
+
Tasks
+
Task assignment
+
Deadlines
+
Task statuses
+
Search
+
Filtering
+
Dashboard
+
Calendar
+
Notifications
+
Progress tracking.

After implementation, verify that the major functionality works and fix errors before considering the project complete.
