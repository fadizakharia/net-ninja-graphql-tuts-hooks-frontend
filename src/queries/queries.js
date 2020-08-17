import { gql } from "@apollo/client";
const getAuthors = gql`
  query getAuthors {
    authors {
      name
      id
    }
  }
`;
const getBooksQuery = gql`
  query getBooks {
    books {
      name
      id
    }
  }
`;
const getBookQuery = gql`
  query getBook($bookId: ID!) {
    book(id: $bookId) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
const addBook = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(authorId: $authorId, name: $name, genre: $genre) {
      name
      id
    }
  }
`;

export { getAuthors, getBooksQuery, addBook, getBookQuery };
