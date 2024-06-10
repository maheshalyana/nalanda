**Deployed Link** http://43.204.30.47:3000/

# Setup

### Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js (v14.x or later)
- MongoDB (local or a MongoDB Atlas account)
- Git

### Installation
Clone the repository:

```sh
git clone <repository-url>
cd <repository-name>
```

Install dependencies:

```sh
npm install
```

Set up environment variables:

1. Create a .env file in the root of the project.
2. Add the following environment variables to the .env file:

```makefile
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Start the MongoDB server:

If you have MongoDB installed locally, you can start it using:

```sh
mongod
```

Alternatively, if you are using MongoDB Atlas, make sure your connection string (MONGO_URI) is correctly set up in the .env file.

Run the application:

```sh
npm start
```

The server should start and listen on the port specified in the .env file (default is 5000).

### Access the application:
- Open your browser and navigate to http://localhost:5000.
- You can access the API endpoints using tools like Postman or curl.
- The GraphQL playground can be accessed at http://localhost:5000/graphql.

## Project Structure
- `config/db.js`: Database connection configuration.
- `controllers/`: Contains the logic for handling API requests.
- `routes/`: Defines the API endpoints and routes.
- `graphql/`: Contains GraphQL schema and resolvers.
- `middlewares/`: Contains middleware functions.
- `models/`: (Removed in the native MongoDB setup) Previously contained Mongoose models.
- `server.js`: Entry point of the application.

## Example .env File
Here's an example of what your .env file should look like:

```makefile
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
```

Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string and `<your_jwt_secret>` with your desired JWT secret key.


# API Documentation

## Authentication

### Register User

Endpoint: `/api/auth/register`

Method: POST

Description: Registers a new user.

Request Body:

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```

Response:

- 201 Created: User registered successfully.
- 500 Internal Server Error: Server error.

### Login User

Endpoint: `/api/auth/login`

Method: POST

Description: Logs in a user and returns a JWT token.

Request Body:

```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

Response:

```json
{
    "token": "your_jwt_token"
}
```

- 401 Unauthorized: Invalid credentials.
- 500 Internal Server Error: Server error.

## Book Management

### Add Book

Endpoint: `/api/books`

Method: POST

Description: Adds a new book to the collection.

Request Body:

```json
{
    "title": "Book Title",
    "author": "Author Name",
    "publicationDate": "2023-01-01T00:00:00.000Z",
    "genre": "Fiction",
    "copies": 5
}
```

Response:

- 201 Created: Book added successfully.
- 500 Internal Server Error: Server error.

### Update Book

Endpoint: `/api/books/:id`

Method: PUT

Description: Updates an existing book.

Request Body:

```json
{
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "publicationDate": "2023-01-01T00:00:00.000Z",
    "genre": "Fiction",
    "copies": 5
}
```

Response:

- 200 OK: Book updated successfully.
- 500 Internal Server Error: Server error.

### Delete Book

Endpoint: `/api/books/:id`

Method: DELETE

Description: Deletes an existing book.

Response:

- 200 OK: Book deleted successfully.
- 500 Internal Server Error: Server error.

### List Books

Endpoint: `/api/books`

Method: GET

Description: Retrieves a list of books.

Response:

```json
[
    {
        "id": "60c72b2f9b1d8c3f4c8e8b9f",
        "title": "Book Title",
        "author": "Author Name",
        "publicationDate": "2023-01-01T00:00:00.000Z",
        "genre": "Fiction",
        "copies": 5
    },
    ...
]
```

- 500 Internal Server Error: Server error.

## Borrowing

### Borrow Book

Endpoint: `/api/borrows`

Method: POST

Description: Borrows a book.

Request Body:

```json
{
    "bookId": "60c72b2f9b1d8c3f4c8e8b9f"
}
```

Response:

- 201 Created: Book borrowed successfully.
- 400 Bad Request: No copies available.
- 500 Internal Server Error: Server error.

### Return Book

Endpoint: `/api/borrows/return`

Method: POST

Description: Returns a borrowed book.

Request Body:

```json
{
    "borrowId": "60c72b2f9b1d8c3f4c8e8b9f"
}
```

Response:

- 200 OK: Book returned successfully.
- 404 Not Found: Borrow record not found.
- 500 Internal Server Error: Server error.

### Borrow History

Endpoint: `/api/borrows`

Method: GET

Description: Retrieves the borrow history of the logged-in user.

Response:

```json
[
    {
        "id": "60c72b2f9b1d8c3f4c8e8b9f",
        "userId": "60c72b2f9b1d8c3f4c8e8b9f",
        "bookId": "60c72b2f9b1d8c3f4c8e8b9f",
        "borrowDate": "2023-01-01T00:00:00.000Z",
        "returnDate": "2023-01-15T00:00:00.000Z"
    },
    ...
]
```

- 500 Internal Server Error: Server error.

## Most Borrowed Books

Endpoint: `/api/reports/most-borrowed-books`
Method: GET
Response:
```json
[
    {
        "_id": "bookId1",
        "count": 10,
        "book": {
            "title": "Book Title",
            "author": "Author Name",
            ...
        }
    },
    ...
]
```

## Active Members

Endpoint: `/api/reports/active-members`
Method: GET
Response:
```json
[
    {
        "_id": "userId1",
        "count": 15,
        "user": {
            "name": "User Name",
            "email": "user@example.com",
            ...
        }
    },
    ...
]
```

## Book Availability

Endpoint: `/api/reports/book-availability`
Method: GET
Response:
```json
{
    "totalBooks": 100,
    "borrowedBooks": 25,
    "availableBooks": 75
}
```

## GraphQL API

### GraphQL Endpoint

Endpoint: `/graphql`

Method: `POST`

Description: GraphQL endpoint to query and mutate data.

Request Body: GraphQL query or mutation

```graphql
query {
    users {
        id
        name
        email
        role
    }
}
```

Response: Depends on the query or mutation executed.

### Example Queries and Mutations

#### Query All Users

```graphql
query {
    users {
        id
        name
        email
        role
    }{
}
```

#### Query All Books
cationDate
```graphql
query {
    books {
        id
        title
        author
        publicationDate
        genre
        copies
    }
```

#### Add a New User
   }
```graphql
mutation {
    addUser(name: "Jane Doe", email: "janedoe@example.com", password: "password123", role: "Member") 
    {
        id
        name
        email
        role
    }
```

#### Add a New Book

```graphql
mutation {
  addBook(title: "New Book", author: "New Author",  publicationDate: "2024-01-01", genre: "Non-Fiction", copies: 10) {
    id
    title
    author
    publicationDate
    genre
    copies
  }
}
```

#### Borrow a Book
   }
```graphql
mutation {
  borrowBook(bookId: "60c72b2f9b1d8c3f4c8e8b9f") {
    id
    userId
    bookId
    borrowDate
  }
}
```

#### Return a Book
```graphql   }
mutation {
  returnBook(borrowId: "60c72b2f9b1d8c3f4c8e8b9f") {
    id
    userId
    bookId
    borrowDate
    returnDate
  }
}
```

