import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserInBulkAction } from '../../../Redux/AdminFeatures/action/adminAuthAction';
import { bulkAddBookAction } from '../../../Redux/AdminFeatures/action/adminBookAction';
import './bulkBookUpload.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';

export default function BulkUpload() {
  const user = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userFile, setUserFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUserFileChange = (e) => {
    setUserFile(e.target.files[0]);
  };

  const handleBookFileChange = (e) => {
    setBookFile(e.target.files[0]);
  };

  const handleUploadUsers = async () => {
    if (!userFile) return setMessage('Please select a user file.');

    const formData = new FormData();
    formData.append('file', userFile);

    const result = await dispatch(addUserInBulkAction(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('Users uploaded successfully!');
    } else {
      setMessage('User upload failed.');
    }
  };

  const handleUploadBooks = async () => {
    if (!bookFile) return setMessage('Please select a book file.');

    const formData = new FormData();
    formData.append('file', bookFile);

    const result = await dispatch(bulkAddBookAction(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('Books uploaded successfully!');
    } else {
      setMessage('Book upload failed.');
    }
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
      <div className="bulk-upload-container">
        <h2>Bulk Upload</h2>
        {message && <p className="upload-message">{message}</p>}

        <div className="upload-section">
          <label>User File (CSV/Excel):</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleUserFileChange} />
          <button onClick={handleUploadUsers}>Upload Users</button>
        </div>

        <div className="upload-section">
          <label>Book File (CSV/Excel):</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleBookFileChange} />
          <button onClick={handleUploadBooks}>Upload Books</button>
        </div>
      </div>
    </>
  );
}
