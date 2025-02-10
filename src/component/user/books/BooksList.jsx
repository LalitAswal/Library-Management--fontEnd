import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allBooksAction, borrowBookAction, searchBookAction } from '../../../Redux/features/action/booksAction.js';
import { useNavigate } from 'react-router-dom';

export const BooksList = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [bookData, setBookData] = useState([]);
  const [searchField, setSearchField] = useState('status'); 
  const navigate = useNavigate();

  // Get books from Redux store
  const { data: books, loading, message, status } = useSelector((state) => state.allBooks);

  useEffect(() => {
    dispatch(allBooksAction());
  }, [dispatch]);

  // Sync books with local state
  useEffect(() => {
    if (books?.length) {
      setBookData(books);
    }
  }, [books]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleBorrow = async (id) => {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      console.error('User ID not found in sessionStorage');
      return;
    }

    try {
      const response = await dispatch(borrowBookAction({ id, userId })).unwrap();

      // Update bookData locally to reflect status change
      setBookData((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, status: 'UNAVAILABLE' } : book
        )
      );
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleBookDetails = (id) => {
    navigate(`/bookDetails/${id}`);
  };

  const handleFieldChange = (e) => setSearchField(e.target.value);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const result = await dispatch(searchBookAction({ field: searchField, query: searchValue })).unwrap();
      setBookData(result);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <h1>Books List</h1>
      <div>
        <h3>Search:</h3>
        <label>
          Search by:
          <select value={searchField} onChange={handleFieldChange}>
            <option value="status">Status</option>
            <option value="id">ID</option>
            <option value="author">Author</option>
            <option value="title">Title</option>
          </select>
        </label>

        <input
          type="text"
          name="searchQuery"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={`Enter ${searchField}...`}
        />

        <button onClick={handleSearch}>Go</button>
      </div>

      {loading && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
      {status === 'success' && bookData.length === 0 && <p>No books found.</p>}

      <table border="1" cellPadding="15" cellSpacing="0">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookData?.map((book, index) => (
            <tr key={book.id} onClick={() => handleBookDetails(book.id)}>
              <td>{index + 1}</td>
              <td>{book?.title}</td>
              <td>{book?.author}</td>
              <td>{book?.status}</td>
              <td>
                <button
                  style={{
                    backgroundColor: book?.status === 'AVAILABLE' ? 'green' : 'red',
                    color: 'white',
                    cursor: book?.status === 'AVAILABLE' ? 'pointer' : 'not-allowed',
                  }}
                  disabled={book?.status !== 'AVAILABLE'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBorrow(book.id);
                  }}
                >
                  {book?.status === 'AVAILABLE' ? 'Borrow' : 'Unavailable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};