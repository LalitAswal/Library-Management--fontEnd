import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; 
import { bookDetailsAction } from "../../../Redux/features/action/booksAction";

export const BookDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        console.log("Fetching Book Details for ID:", id);
        const response = await dispatch(bookDetailsAction({ id })).unwrap();
        console.log("Book Details Response:", response);
        setBookDetails(response.data.response);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id, dispatch]);

  return (
    <>
      <h1>Book Details</h1>
      {bookDetails ? (
        <>
          <p>Book ID: {bookDetails?.id}</p>
          <p>Title: {bookDetails?.title}</p>
          <p>Author: {bookDetails?.author}</p>
          <p>Available Status: {bookDetails?.status}</p>
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </>
  );
};
