import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';
import { borrowedBookListAction } from '../../../Redux/features/action/authAction';
import './userDetails.css';

const user = {
  id: sessionStorage.getItem('id'),
  name: sessionStorage.getItem('userName'),
  role: sessionStorage.getItem('role'),
};

export const BorrowedBookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data, error } = useSelector((state) => state.borrowedBookList);

  useEffect(() => {
    if (user.id) {
      dispatch(borrowedBookListAction(user.id));
    }
  }, [dispatch]);

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

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
        handleProfile={handleProfile}
        handleBookList={handleBookList}
      />

      <div className="booklist-container">
        <h2>Borrowed Books</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && data.length === 0 && <p>No books found.</p>}

        <ul className="booklist">
          {data.map((book, index) => (
            <li key={index} className="book-item">
              <strong>Title:</strong> {book.book?.title} <br />
              <strong>Author:</strong> {book.book?.author} <br />
              <strong>Borrowed Date:</strong> {new Date(book.borrowDate).toLocaleDateString()}<br />
              <strong>Due Date:</strong> {new Date(book?.returnDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
