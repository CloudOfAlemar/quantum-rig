# Quantum Rig

Quantum Rig is a full-stack web application that allows users to create and manage custom PC builds. Users can sign up, log in, and create personalized PC builds by selecting and commenting on various parts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/CloudOfAlemar/quantum-rig.git
    cd quantum-rig
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up the database**:

    Ensure you have PostgreSQL installed and running. Create a `.env` file in the root directory and configure your database connection:

    ```env
    DB_NAME='quantum_rig_db'
    DB_USER='your_db_username'
    DB_PASSWORD='your_db_password'
    DB_HOST='localhost'
    DB_DIALECT='postgres'
    ```

4. **Run database migrations**:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the server**:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3001`.

## Usage

1. **Sign Up**: Create a new account.
2. **Log In**: Log in to your account.
3. **Create a Build**: Start a new PC build by adding parts and personal comments.
4. **View Dashboard**: Manage your builds and view details.

## Features

- User Authentication: Sign up, log in, and log out.
- Build Management: Create, view, and manage custom PC builds.
- Dynamic Content: Display user-specific content based on login status.
- Session Handling: Securely manage user sessions with session cookies.

## Technologies

- **Backend**: Node.js, Express.js, Sequelize, PostgreSQL
- **Frontend**: Handlebars.js, Bootstrap
- **Authentication**: Express-Session, Connect-Session-Sequelize, bcrypt
- **Utilities**: dotenv, nodemon (for development)

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

© 2024 Quantum Rig - All Rights Reserved.
