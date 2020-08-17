import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, addBook, getBooksQuery } from "../queries/queries";

export default function AddBook() {
  const { loading, data, error } = useQuery(getAuthors);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const [callAddBook, result] = useMutation(addBook, {
    variables: { name: name, authorId: author, genre: genre },
    refetchQueries: [{ query: getBooksQuery }],
  });

  async function submitAddBook(e) {
    e.preventDefault();
    await callAddBook();
  }

  if (error) return <h1>Error! with message:{" " + error.message}</h1>;
  return (
    <form id="add book" onSubmit={submitAddBook}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>author</label>
        <select onChange={(e) => setAuthor(e.target.value)}>
          <option>Select author</option>
          {!loading ? (
            data.authors.map((author) => {
              return (
                <option value={author.id} key={author.id} id={author.id}>
                  {author.name}
                </option>
              );
            })
          ) : (
            <option disabled>loading data...</option>
          )}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}
