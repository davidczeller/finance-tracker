#!/bin/bash

echo "Waiting for database..."
/wait-for-it.sh postgresql_database 5432

echo "Database is up!"
sleep 5

echo "Running migrations..."
npm run migration:run

echo "Starting application..."
exec npm run dev 