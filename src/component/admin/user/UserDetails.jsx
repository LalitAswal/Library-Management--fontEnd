import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';

export const UserDetails = () => {
  const currentUser = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({
    id: '',
    userName: '',
    role: '',
  });

  const navigate = useNavigate();

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
      {currentUser && (
        <NavBar
          user={currentUser}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
          handleBookList={handleBookList}
        />
      )}
    </>
  );
};
