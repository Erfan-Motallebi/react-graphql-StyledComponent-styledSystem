import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

import BookLists from "./components/BookLists";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/api/books",
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <BookLists />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
