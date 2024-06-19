# Real-Time Data Classification API

This project is a real-time data classification system built with Node.js, Express, MongoDB, and Socket.io. It allows users to define classification rules, authenticate using JWT, and classify incoming data in real time.

## Features

- User authentication using JWT.
- Create, read, update, and delete classification rules.
- Real-time data classification with Socket.io.
- Web-based frontend for user interaction.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd realtime-classification-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    JWT_SECRET=your_secret_key
    DB_CONNECTION_STRING=mongodb://localhost:27017/realtime_classification
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## API Endpoints

### User Authentication

- **Register a new user:**
    - **POST** `http://localhost:3000/api/dsl_proj/register`
    - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- **Login a user:**
    - **POST** `http://localhost:3000/api/dsl_proj/login`
    - Body: `{ "email": "john@example.com", "password": "password123" }`

### User Information

- **Get user ID from the current session token:**
    - **GET** `http://localhost:3000/api/dsl_proj/user`
    - Headers: `{ "x-auth-token": "<JWT_TOKEN>" }`

### Classification Rules

- **Create a new rule:**
    - **POST** `http://localhost:3000/api/rules`
    - Headers: `{ "x-auth-token": "<JWT_TOKEN>" }`
    - Body: `{ "rule": "IF temperature > 30 THEN category = 'hot'" }`

- **Get all rules for the logged-in user:**
    - **GET** `http://localhost:3000/api/rules`
    - Headers: `{ "x-auth-token": "<JWT_TOKEN>" }`

- **Update a rule:**
    - **PUT** `http://localhost:3000/api/rules/:id`
    - Headers: `{ "x-auth-token": "<JWT_TOKEN>" }`
    - Body: `{ "rule": "IF temperature < 10 THEN category = 'cold'" }`

- **Delete a rule:**
    - **DELETE** `http://localhost:3000/api/rules/:id`
    - Headers: `{ "x-auth-token": "<JWT_TOKEN>" }`


## Frontend

The frontend of this project includes HTML forms for user registration, login, rule creation, and data classification. The views are served from the Express server.

## License

This project is licensed under the MIT License.
