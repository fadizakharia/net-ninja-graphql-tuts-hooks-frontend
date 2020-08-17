import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";
import BookDetails from "./BookDetails";

function BookList(props) {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const passedSelected = selected;
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return (
            <li
              onClick={(e) => {
                setSelected(book.id);
              }}
              key={book.id}
            >
              {book.name}
            </li>
          );
        })}
      </ul>

      <BookDetails bookId={passedSelected} />
    </div>
  );
}
// graphql(getBooksQuery)();
export default BookList;
