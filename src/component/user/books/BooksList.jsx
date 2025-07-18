import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allBooksAction,
  borrowBookAction,
  searchBookAction,
} from '../../../Redux/features/action/booksAction.js';
import { useNavigate } from 'react-router-dom';
import './BooksList.css';
import NavBar from '../../common/Navbar.js';

const user = {
  name: sessionStorage.getItem('userName'),
  role: sessionStorage.getItem('role'),
};

export const BooksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [bookData, setBookData] = useState([]);
  const [searchField, setSearchField] = useState('status');

  const { response: books, loading, message, status } = useSelector((state) => state.allBooks);

  useEffect(() => {
    dispatch(allBooksAction());
  }, [dispatch]);

  useEffect(() => {
    if (books?.length) {
      setBookData(books);
    }
  }, [books]);

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleFieldChange = (e) => setSearchField(e.target.value);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const result = await dispatch(
        searchBookAction({ field: searchField, query: String(searchValue) })
      ).unwrap();
      setBookData(result);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleBorrow = async (id) => {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
      console.error('User ID not found in sessionStorage');
      return;
    }

    try {
      await dispatch(borrowBookAction({ id, userId })).unwrap();
      setBookData((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? { ...book, status: 'UNAVAILABLE' } : book))
      );
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleBookDetails = (id) => {
    navigate(`/book_Details/${id}`);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleBookList = () => {
    navigate('/Borrowed_Book_List');
  };

  const handleBookUpdate = () => {
    navigate('/update_book');
  };

  const handleBookDelete = () => {
    // TODO  create RUdex of it
  };

  return (
    <>
      {user && (
        <NavBar
          user={user}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
          handleBookList={handleBookList}
        />
      )}

      <div className="books-container">
        <div className="books-header">
          <h1>Books List</h1>
          {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
        </div>

        <div className="search-section">
          <label>
            Search by:
            <select value={searchField} onChange={handleFieldChange}>
              <option value="status" type="text">
                Status
              </option>
              <option value="author" type="text">
                Author
              </option>
              <option value="title" type="text">
                Title
              </option>
              <option value="title" type="text">
                Status
              </option>
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

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
              <th>Delete</th>
              {user.role === 'librarian' && <th>Update</th>}
            </tr>
          </thead>
          <tbody>
            {console.log('bookData', bookData)}
            {bookData?.map((book, index) => (
              <tr key={book.id} onClick={() => handleBookDetails(book.id)}>
                <td>{index + 1}</td>
                <td>{book?.title}</td>
                <td>{book?.author}</td>
                <td>{book?.status}</td>
                <td>
                  <button
                    className={`status-button ${book?.status === 'AVAILABLE' ? 'available' : 'unavailable'}`}
                    disabled={book?.status !== 'AVAILABLE'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBorrow(book.id);
                    }}
                  >
                    {book?.status === 'AVAILABLE' ? 'Borrow' : 'Unavailable'}
                  </button>
                </td>
                <td>
                  <button
                    className={`status-button unavailable`}
                    // disabled={book?.status !== 'AVAILABLE'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookDelete(book.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className={`status-button unavailable`}
                    // disabled={book?.status !== 'AVAILABLE'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookUpdate(book.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
