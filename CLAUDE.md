@AGENTS.md

## Database

The project's database is an AWS RDS PostgreSQL instance. The app does not connect to it directly: all communication goes through an AWS EC2 instance (the backend), which talks to RDS on the app's behalf.
