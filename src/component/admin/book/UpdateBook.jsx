import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../common/Navbar';
import './createBook.css';

const UpdateBook = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
  });

  const user = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Book Details:', bookDetails);
    // Add API call or logic here
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

      <div className="update-book-container">
        <h1 className="form-title">Update Book</h1>
        <form className="update-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={bookDetails.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              name="author"
              id="author"
              value={bookDetails.author}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
