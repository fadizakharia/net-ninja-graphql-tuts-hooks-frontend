import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";
export default function BookDetails(props) {
  const [bookId, setBookId] = useState("");
  const [callGetBook, { data, error, loading, called }] = useLazyQuery(
    getBookQuery,
    {
      variables: { bookId: bookId },
    }
  );
  useEffect(() => {
    if (props.bookId) {
      setBookId(props.bookId);
      console.log(bookId);
      callGetBook();
    }
  }, [props.bookId, bookId, callGetBook]);

  let details = <div>No book selected</div>;

  if (called && !loading) {
    if (data.book) {
      details = (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>books by author:</p>
          <ul className="other-books">
            {data.book.author.books.map((bba) => {
              return <li key={bba.id}>{bba.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  }

  console.log(bookId);

  return (
    <div id="book-details">
      <p>book details here</p>
      {details}
    </div>
  );
}
