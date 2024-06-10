const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    borrowLimit: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    publicationDate: String!
    genre: String!
    copies: Int!
  }

  type Borrow {
    id: ID!
    userId: ID!
    bookId: ID!
    borrowDate: String!
    returnDate: String
  }

  type Query {
    users: [User]
    books: [Book]
    borrows: [Borrow]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, role: String): User
    addBook(title: String!, author: String!, publicationDate: String!, genre: String!, copies: Int!): Book
    borrowBook(bookId: ID!): Borrow
    returnBook(borrowId: ID!): Borrow
  }
`);

module.exports = schema;
