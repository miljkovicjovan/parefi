# PareFi - Personal Finance Tracker

**This project has only 2 commits, still earlyyy stages. Right now the stack has been developed and I'm sketching architecture. Feel free to submit issues and PRs.**

PareFi is a self-hostable personal finance tracker that allows users to manage their investments, track their spending, and analyze financial data. Built with Next.js for the frontend, Express.js for the backend, and PostgreSQL for the database, this project aims to provide a simple and secure way to track and manage finances.

## Features

**missing a lot right now, earlyyy stages**

- User authentication and management (create, view, delete users)
- Simple interface for tracking investments and finances
- PostgreSQL database for storing financial data
- RESTful API for backend communication

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Express.js, Prisma, PostgreSQL
- **Database:** PostgreSQL
- **Deployment:** Docker

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/miljkovicjovan/parefi.git
cd parefi
```

### 2. Setup Environment Variables

Create a `.env` file at the root of the project, and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb?schema=public
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb

# optional if you want to use pgAdmin
PGADMIN_EMAIL=
PGADMIN_PASSWORD=
```

In your **`backend/.env`** file, add the following environment variables:

```env
DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/mydb?schema=public
```

### 3. Install Dependencies

1. **Install frontend dependencies**:
   
Navigate to the `frontend` folder and run:

```bash
npm install
```

2. **Install backend dependencies**:
   
Navigate to the `backend` folder and run:

```bash
npm install
```

### Step 4: Start Docker Compose

Now that you have installed the dependencies for both the frontend and backend, it's time to start the Docker containers using Docker Compose.

1. **Start the Docker containers**:

From the root of your project, run the following command:

```bash
docker-compose up
```

This command will build the containers and start the services for the frontend, backend, and PostgreSQL database.

2. **Ensure the database is running**:

The backend depends on the PostgreSQL service, and Docker Compose will automatically manage this for you. Ensure that all containers are up and running. You can verify the status of the containers with:

```bash
docker-compose ps
```

3. **Run Database Migrations**:

Once the containers are running, it's time to run the Prisma migrations to initialize your database schema. Run the following inside the `backend` folder:

```bash
npx prisma migrate dev --name init
```

4. **Verify Migration and Database**:

There are two components inside the `frontend/src/components` that can be used for testing. The `CreateUser.tsx` for creating a user and then the `UserList.tsx` for displaying the users in your database. You can place them inside the `frontend/src/pages/index.tsx` file and try them out. 

## Contributing

Feel free to contribute! Open an issue or submit a pull request.

## License

This project is licensed under the MIT License.