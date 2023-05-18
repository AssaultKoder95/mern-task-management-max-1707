## TASK MANAGEMENT APP

This app implements the following features:

1. User Registration and Authentication:
   - Users should be able to register an account with a username and password.
   - Implement password hashing and salt techniques for secure storage.
2. Task Management:
   - Authenticated users should be able to create, update, and delete tasks.
   - Each task should have a title, description, status, and due date.
   - Users should be able to set reminders for tasks and receive notifications (e.g., via
     email or in-app notifications) when a task is due.
   - Implement a task history feature that tracks the changes made to tasks (e.g.,
     creation, updates, status changes).
3. User Interface:
   - Implement an intuitive and aesthetically pleasing user interface.
   - Incorporate responsive design principles to ensure the application works seamlessly
     across different devices and screen sizes.
4. Data Persistence:
   - Store task, user, and task history data in a database of your choice (e.g., MySQL,
     PostgreSQL, MongoDB).
   - Design the necessary database schema and relationships, considering data
     normalization and efficiency.
5. Testing:
   - Write comprehensive unit tests to ensure critical functionality is working as
     expected.
   - Implement integration tests for various user interactions and scenarios.
   - Aim for high test coverage and include testing of frontend and backend components.
6. Deployment:
   - Provide clear instructions on how to run the application locally and access the
     deployed version (if applicable).

Additional Requirements:

1. Implement user roles and permissions (e.g., admin, regular user) with appropriate access
   restrictions and authorization checks.
2. Enable search functionality to allow users to find specific tasks based on title, description, or
   other criteria.
3. Implement pagination or infinite scrolling for task listing pages to handle a large number of
   tasks efficiently.
4. Implement real-time updates for task status changes and task assignments using
   technologies like WebSockets or Server-Sent Events.
5. Provide a comprehensive error handling and logging mechanism to facilitate debugging and
   troubleshooting. **[ PARTLY ]**
6. Implement a user-friendly onboarding process, including an interactive tutorial or guided
   tour of the application's features.
7. Optimize the application's performance, considering factors like database query
   optimization, caching strategies, and frontend optimizations (e.g., lazy loading, code
   splitting).

### How to run

The app is divided into two parts - Frontend and Backend.
The setup to run these are minimal. First you need a running instance of MongoDB on port 27017 on your machine.

```
Note: If you have docker installed, you can simply run the MongoDB image in your docker and export the port 27017.
The backend app will automatically connect to the database and start running.
```

Once you have the MongoDB running, to run the both the codebases, you need to **separately** run these commands in respective folders:

```
npm i
npm run dev
```

and you should be able to see something like this:

<img width="787" alt="Screenshot 2023-05-18 at 7 15 52 PM" src="https://github.com/AssaultKoder95/mern-task-management-max-1707/assets/6575313/4c7459d6-e800-4cf1-8af4-318e617eed1b">

https://github.com/AssaultKoder95/mern-task-management-max-1707/assets/6575313/e91488ad-8f8f-4669-b918-1a334b1896da


### Future Plans

- Login via SSO ( Gmail, Apple, Facebook )
- Implement Sentry in complete codebase
- Improvement in UI ( confirmation box before deletion etc )
