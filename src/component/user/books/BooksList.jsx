import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allBooksAction } from '../../../Redux/features/action/booksAction.js';

export const BooksList = () => {
  const dispatch = useDispatch();

  // Access state from Redux
  const { books, loading, message, status } = useSelector((state) => {
    console.log('checkingsstate', state)
    state.allBooks});

  // Fetch all books on component mount
  useEffect(() => {
    dispatch(allBooksAction());
  }, [dispatch]);

  return (
    <div>
      <h1>Books List</h1>
      {loading && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
      {status === 'success' && books.length === 0 && <p>No books found.</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};
