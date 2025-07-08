import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; 
import { bookDetailsAction } from "../../../Redux/features/action/booksAction";
import './BooksList.css';
import NavBar from "../../common/Navbar";

const user = {
  name: sessionStorage.getItem("userName"),
  role: sessionStorage.getItem("role")
};

export const BookDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const response = await dispatch(bookDetailsAction({ id })).unwrap();
        setBookDetails(response.data.response);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id, dispatch]);

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
     {user && <NavBar user={user} handleLogout={handleLogout} 
     handleProfile={handleProfile} handleBookList={handleBookList}
      />}
    
    <div className="book-details-container">
      <h1>Book Details</h1>
      {bookDetails ? (
        <>
          <p className="book-detail"><strong>Book ID:</strong> {bookDetails?.id}</p>
          <p className="book-detail"><strong>Title:</strong> {bookDetails?.title}</p>
          <p className="book-detail"><strong>Author:</strong> {bookDetails?.author}</p>
          <p className="book-detail"><strong>Status:</strong> {bookDetails?.status}</p>
        </>
      ) : (
        <p className="loading-message">Loading book details...</p>
      )}

      <button className="back-button" onClick={handleBack}>← Back</button>
    </div>
    </>
  );
};