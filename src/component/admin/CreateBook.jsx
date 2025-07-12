import React, { useState } from 'react';

export default function CreateBook() {
  const [bookDetails, setBookDetails] = useState({
    Title: '',
    Author: '',
  });

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

  return (
    <>
      <h1>Create Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" name="Title" value={bookDetails.Title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Author
          <input type="text" name="Author" value={bookDetails.Author} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
