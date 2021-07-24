import { gql } from "@apollo/client";

export const GetBookListsQuery = gql`
  query GetBookLists {
    books {
      id
      name
      genre
      yearOfRelease
      authorId
    }
  }
`;

export const AddBookMutation = gql`
  mutation AddBook(
    $name: String!
    $genre: String!
    $yearOfRelease: Int!
    $authorId: String!
  ) {
    addBook(
      name: $name
      genre: $genre
      yearOfRelease: $yearOfRelease
      authorId: $authorId
    ) {
      name
      yearOfRelease
      authorId
      genre
    }
  }
`;

export const GetAuthorListsQuery = gql`
  query GetAuthorLists {
    authors {
      name
      id
    }
  }
`;

export const GetBooklistDetails = gql`
  query getBookListDetails($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      yearOfRelease
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;
