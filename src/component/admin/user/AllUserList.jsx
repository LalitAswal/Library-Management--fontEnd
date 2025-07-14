import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';
import ConfirmModal from '../../../services/ConfirmModal';
import {
  listAllUserAction,
  deleteUserAction,
} from '../../../Redux/AdminFeatures/action/adminAuthAction';
import './adminUser.css';

export default function AllUserList() {
  const user = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: allUser, loading, error } = useSelector((state) => state.allUser);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState('');

  // 🧹 Fetch all users on mount
  useEffect(() => {
    dispatch(listAllUserAction());
  }, [dispatch]);

  // ✅ Handle logout
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

  const handleDeleteClick = (id) => {
    console.log('checkingid ', id);
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Confirmed delete');
    console.log('checking selectedUserId', selectedUserId);
    if (!selectedUserId) return;
    const result = await dispatch(deleteUserAction(selectedUserId));

    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('User deleted successfully.');
    } else {
      setMessage('Failed to delete user.');
    }

    setShowModal(false);
    setSelectedUserId(null);
    dispatch(listAllUserAction());
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
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

      <ConfirmModal
        show={showModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {loading && <p className="status-message">Loading...</p>}
      {error && (
        <p className="status-message" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {!loading && allUser && allUser.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((u) => (
              <tr key={u.id} onClick={() => navigate(`/user_details/${u.id}`)}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteClick(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="status-message">No users found.</p>
      )}
    </>
  );
}
