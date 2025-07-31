import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';
import { userProfileAction } from '../../../Redux/features/action/authAction';
import './userDetails.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
    id: sessionStorage.getItem('id'),
  });

  const { loading, userProfile, error } = useSelector((state) => state.profile || {});

  useEffect(() => {
    if (user?.id) {
      dispatch(userProfileAction({ id: user.id }));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (userProfile) {
      setUser((prev) => ({
        ...prev,
        ...userProfile,
      }));
    }
  }, [userProfile]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleProfile = () => navigate('/profile');
  const handleBookList = () => navigate('/Borrowed_Book_List');

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
        handleProfile={handleProfile}
        handleBookList={handleBookList}
      />

      <div className="profile-container">
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {user.username || user.name || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {user.email || 'N/A'}
        </p>
        <p>
          <strong>Role:</strong> {user.role || 'N/A'}
        </p>
        {loading && <p>Loading profile...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </>
  );
}
