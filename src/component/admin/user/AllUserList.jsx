import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/Navbar';

export default function AllUserList() {
  const user = {
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('role'),
  };

  const [userList, setUserList] = useState({
    id: '',
    username: '',
    role: '',
    createAt: '',
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
      {user && (
        <NavBar
          user={user}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
          handleBookList={handleBookList}
        />
      )}
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Role</td>
            <td>Delete</td>
          </tr>
        </thead>

        {/* <tbody>
          {userList.map(()=>(
            <tr key={user.id}></tr>
          ))
          }
        </tbody> */}
      </table>
    </>
  );
}
