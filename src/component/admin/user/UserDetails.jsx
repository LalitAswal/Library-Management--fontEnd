import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../common/Navbar';
import { updateUserAction } from '../../../Redux/AdminFeatures/action/adminAuthAction';
import { listAllUserAction } from '../../../Redux/AdminFeatures/action/adminAuthAction';

export const UserDetails = () => {
  const currentUser = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: allUser } = useSelector((state) => state.allUser);

  const [userDetails, setUserDetails] = useState({
    id: '',
    username: '',
    role: '',
  });

  const [message, setMessage] = useState('');

  // Populate user details from allUser
  useEffect(() => {
    if (!allUser || allUser.length === 0) {
      dispatch(listAllUserAction());
    } else {
      const user = allUser.find((u) => String(u.id) === String(id));
      if (user) {
        setUserDetails({
          id: user.id,
          username: user.username,
          role: user.role,
        });
      }
    }
  }, [allUser, dispatch, id]);

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
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserAction(userDetails));
    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('User updated successfully');
      dispatch(listAllUserAction());
    } else {
      setMessage('Update failed');
    }
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

      <div className="user-details-container">
        <h2>User Details</h2>
        {message && <p>{message}</p>}
        <form className="user-form" onSubmit={handleSubmit}>
          <div>
            <label>User ID:</label>
            <input type="text" value={userDetails.id} disabled />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Role:</label>
            <select name="role" value={userDetails.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <button type="submit">Update User</button>
        </form>
      </div>
    </>
  );
};
