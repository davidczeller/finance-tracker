#!/bin/bash

# Wait for the database to be ready
/wait-for-it.sh postgresql_database 5432 --timeout=30 -- echo "Database is up"

# Run migrations
echo "Running migrations..."
NODE_ENV=development npx sequelize-cli db:migrate

# Start the application
echo "Starting application..."
npm run dev 