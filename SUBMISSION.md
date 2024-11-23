# Build Your Own Timer - Submission

## Overview
This project is a full-stack application that tracks the time taken to build the timer from the moment the repository was forked until the task was completed. The timer records both the start time (when the repo was forked) and the end time (when the "Complete Timer" button is clicked).

## Features
- **Timer Display**: Displays the elapsed time since the repository was forked.
- **Complete Button**: When clicked, it freezes the timer, records the end time, and displays the total time taken.
- **Responsive UI**: The application works seamlessly on both desktop and mobile devices.

## Backend
- **Tech Stack**: [Node.js, Express js]
- **Database**: [MongoDB ]
- **Endpoints**:
  - `GET /timer`: Fetches the current timer information.
  - `POST /complete`: Records the end time when the "Complete" button is clicked.

### Schema:
- `assessment_start_time` (DateTime): The time when the repo was forked.
- `assessment_end_time` (DateTime): The time when the task was completed.
- Additional fields: [Calculates the Total Time on the basis of start and end time].

## Frontend
- **Tech Stack**: [React.js, CSS3]
- **Features**:
  - Stopwatch display showing the time elapsed since the repo was forked.
  - "Complete Timer" button to freeze the timer and record the end time.
  - Responsive design to ensure it works across devices.

## Hosting
The app is hosted on [Netlfiy](https://netlify.com).

## AI Tools Used
- [Chatgpt for Debugging Errors Initially from forking repo to get the task.md file info]

## Conclusion
The project meets all the core requirements and technical specifications outlined in the challenge. It has been designed for simplicity, efficiency, and a smooth user experience.



