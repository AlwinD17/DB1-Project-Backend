#!/bin/sh

echo "Waiting for the database to be ready..."
while ! nc -z database 5432; do
  echo "Waiting..."
  sleep 1
done

echo "Database is up - executing commands"

# Migraciones
echo "Generating migrations..."
npm run m:gen -- ./src/migrations/init
echo "Running migrations..."
npm run m:run

# Iniciar la aplicación
echo "Starting the application..."
exec npm run start:dev
