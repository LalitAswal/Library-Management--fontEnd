import { useState } from 'react';
import NavBar from '../../common/Navbar';
import { useNavigate } from 'react-router-dom';
import './createBook.css';

const user = {
  name: sessionStorage.getItem('userName'),
  role: sessionStorage.getItem('role'),
};

export function CreateBook() {
  const [bookDetails, setBookDetails] = useState({
    Title: '',
    Author: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted book details:', bookDetails);
  };

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
      <div className="create-book-container">
        <h1 className="form-title">Create Book</h1>
        <form className="create-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="Title"
              id="Title"
              value={bookDetails.Title}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Author">Author</label>
            <input
              type="text"
              name="Author"
              id="Author"
              value={bookDetails.Author}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
