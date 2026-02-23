# CultureSwap Backend

A RESTful API for the CultureSwap platform - connecting people to share cultural experiences and stories.

## Features

- User authentication with JWT (JSON Web Tokens)
- Password hashing with bcrypt
- CRUD operations for users and cultural experiences
- Protected routes with JWT middleware
- MongoDB database integration
- User ownership validation for experiences

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

## Project Structure

```
cultureswap-backend/
├── controllers/
│   ├── userController.js
│   └── experienceController.js
├── models/
│   ├── User.js
│   └── Experience.js
├── routes/
│   ├── userRoutes.js
│   └── experienceRoutes.js
├── middleware/
│   └── auth.js
├── db/
│   └── connect.js
├── .env
├── server.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cultureswap-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
MONGO_URI=mongodb://localhost:27017/cultureswap
PORT=3000
ACCESS_TOKEN_SECRET=the_access_token
REFRESH_TOKEN_SECRET=the_refresh_token
```

4. Start the development server
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port (default: 3000) |
| `ACCESS_TOKEN_SECRET` | Secret key for JWT access tokens |
| `REFRESH_TOKEN_SECRET` | Secret key for refresh tokens (future use) |

## API Endpoints

### User Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/users/signup` | Register a new user | No |
| POST | `/users/login` | Login user | No |
| GET | `/users/` | Get all users | Yes |
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

### Experience Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/experiences/` | Get all experiences | No |
| GET | `/experiences/:id` | Get experience by ID | No |
| POST | `/experiences/` | Create new experience | Yes |
| PUT | `/experiences/:id` | Update experience | Yes |
| DELETE | `/experiences/:id` | Delete experience | Yes |

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example: Login Request

```bash
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example: Response

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "678abc123...",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Example: Protected Route Request

```bash
GET http://localhost:3000/users/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Usage Examples

### Create a User (Signup)

```bash
POST /users/signup
Content-Type: application/json

{
  "name": "Shiv Dabb",
  "email": "shiv@example.com",
  "password": "securePassword123"
}
```

### Create an Experience

```bash
POST /experiences/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Traditional Japanese Tea Ceremony",
  "description": "Learn the art of Japanese tea ceremony...",
  "category": "Culture",
  "location": "Tokyo, Japan"
}
```

## Security Features

- Passwords are hashed using bcrypt (salt rounds: 10)
- JWT tokens expire after 1 hour
- Protected routes validate JWT tokens
- User ownership validation for experience updates/deletes
- Passwords excluded from API responses

## Testing

Used Postman to test the API endpoints.

1. First, create a user via `/users/signup`
2. Login via `/users/login` to get an access token
3. Use the token to access protected routes

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment configuration

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start
```

## License

This project is part of a MERN learning roadmap.

## Author

Gurshiv Singh Dabb - CultureSwap Project

---

**Note:** This is a learning project following a MERN stack roadmap. Weeks 2-3 completed: MongoDB setup, authentication with JWT, and protected routes.