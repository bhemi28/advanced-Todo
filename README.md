# Fullstack Todo Application

This is a TypeScript-based Express backend for a Fullstack Todo application. The application uses SQLite as the database and includes file storage capabilities.

## Project Structure

```
server
├── src
│   ├── app.ts                # Entry point of the application
│   ├── config
│   │   └── database.ts       # Database connection configuration
│   ├── controllers
│   │   ├── todoController.ts  # Controller for todo-related operations
│   │   └── userController.ts  # Controller for user-related operations
│   ├── middleware
│   │   └── authMiddleware.ts   # Middleware for authentication
│   ├── models
│   │   ├── todoModel.ts       # Model for todo items
│   │   └── userModel.ts       # Model for users
│   ├── routes
│   │   ├── todoRoutes.ts      # Routes for todo-related endpoints
│   │   └── userRoutes.ts      # Routes for user-related endpoints
│   └── utils
│       └── fileStorage.ts     # Utility functions for file storage
├── package.json               # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fullstack-todo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the SQLite database:**
   - Follow the instructions in `src/config/database.ts` to configure your database connection.

4. **Run the application:**
   ```bash
   npm start
   ```

## Usage

- The application exposes RESTful APIs for managing todos and users.
- Refer to the individual controller files for details on available endpoints and their usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.