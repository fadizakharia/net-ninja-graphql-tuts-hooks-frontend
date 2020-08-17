import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
