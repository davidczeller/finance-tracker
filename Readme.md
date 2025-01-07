# Finance Tracker

A full-stack finance tracking application built with Next.js and Express.js.

## Tech Stack

### Frontend
- Next.js 15.1.3
- React 19
- TypeScript
- React Query
- Axios

### Backend
- Express.js
- Sequelize ORM
- PostgreSQL
- Jade Template Engine

### DevOps
- Docker
- Docker Compose

## Prerequisites

- Node.js 18.x
- Docker and Docker Compose
- npm or yarn

## Getting Started

1. Clone the repository

2. Start the application using Docker Compose:

   ```bash
   cd Docker
   docker-compose up --build
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Backend service on port 8000
   - Frontend service on port 3000

## Development Setup

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd FE
   ```

2. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### Backend

1. Navigate to the backend directory:

   ```bash
   cd BE
   ```

2. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

   The backend API will be available at `http://localhost:8000`

## Environment Variables

### Frontend
Create a `.env` file in the `FE` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
Create a `.env` file in the `BE` directory:

```
DB_USER=admin
DB_PASSWORD=admin1234
DB_NAME=finance_tracker_db
DB_HOST=localhost
DB_PORT=5432
PORT=8000
```

## Project Structure

### Frontend
```
FE/
├── src/
│   ├── app/ # Next.js app directory
│   ├── lib/ # Shared utilities
│   └── components/ # React components
├── public/ # Static assets
└── package.json
```

### Backend
```
BE/
├── routes/ # API routes
├── models/ # Sequelize models
├── migrations/ # Database migrations
├── config/ # Configuration files
└── package.json
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run start` - Start production server
- `npm run dev` - Start development server with nodemon

## Database Migrations

To run database migrations:

```bash
cd BE
npx sequelize-cli db:migrate
```

## API Documentation

### Users Endpoints

#### GET /api/users
Returns a list of all users

#### POST /api/users
Create a new user

Request body:

```json
{
  "name": "string",
  "email": "string"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.