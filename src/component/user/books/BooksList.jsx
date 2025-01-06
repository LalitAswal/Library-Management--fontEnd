import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allBooksAction } from '../../../Redux/features/action/booksAction.js';

export const BooksList = () => {
  const dispatch = useDispatch();
  const [searchValue, setValue] = useState('');

  // Access state from Redux
  const { data:books, loading, message, status } = useSelector((state) => state.allBooks);

  const handleSearchChange =(e)=>{
    setValue(e.target.value);
  }

  const handleBorrow=(id)=>{
    
  }

  // Fetch all books on component mount
  useEffect(() => {
    dispatch(allBooksAction());
  }, [dispatch]);

  return (
    <div>
      <h1>Books List</h1>
      <h3>
        <label htmlFor="">
          Search:
          <input type="text"
           name="userName"
           value={searchValue}
           onChange={handleSearchChange} 
           />
        </label>
      </h3>
      {loading && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
      {status === 'success' && books.length === 0 && <p>No books found.</p>}
      <table border="1" cellPadding="15" cellSpacing="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <button
                style={{ backgroundColor: book.status === 'AVAILABLE' ? 'green' : 'red' }}
                onClick={()=>handleBorrow(book.id)}>
                  
                  <td> {book.status === 'AVAILABLE' ? 'Borrow' : 'Unavailable'}</td>
                  </button>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};
