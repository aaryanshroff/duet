# Duet

A web app for musicians to discover collaborators using a Tinder-style matching algorithm.

## Technologies

- React
- Express
- PostgreSQL
- Passport (JWT authentication)
- AWS S3 (video storage)
- Cypress

## Installation

1. Install required dependencies:

   ```bash
   npm run install
   ```

2. Run the queries in `queries.sql` to generate required PostgreSQL tables.
3. Create a `.env` file in the root folder with the following variables:

   ```
    AWS_REGION=[YOUR_AWS_REGION]
    AWS_ACCESS_KEY_ID=[YOUR_AWS_ACCESS_KEY_ID]
    AWS_SECRET_ACCESS_KEY=[YOUR_AWS_SECRET_ACCESS_KEY]
    DB_HOST=localhost
    DB_USER=[YOUR_POSTGRES_USERNAME]
    DB_PASS=[YOUR_POSTGRES_PASSWORD]
    DB_DATABASE=[YOUR_POSTGRES_DB_NAME]
    JWT_SECRET=[YOUR_JWT_SECRET_KEY]
    JWT_EXPIRES=[YOUR_JWT_EXPIRE_TIME]
    S3_BUCKET=[YOUR_S3_BUCKET_NAME]
   ```

4. Run the app on http://localhost:4001:

   ```bash
   npm run dev
   ```
