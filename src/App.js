import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';
import { BooksList } from './component/user/books/BooksList.jsx';
import { BookDetails } from './component/user/books/BookDetails.js';
import NavBar from './component/common/Navbar.js';
import Profile from './component/user/userDetails/Profile.jsx';
import { BorrowedBookList } from './component/user/userDetails/BorrowedBookList.jsx';
import { CreateBook } from './component/admin/book/CreateBook.jsx';
import AllUserList from './component/admin/user/AllUserList.jsx';
import UpdateBook from './component/admin/book/UpdateBook.jsx';
import { UserDetails } from './component/admin/user/UserDetails.jsx';
import BulkUpload from './component/admin/user/BulkBookUpload.jsx';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Borrowed_Book_List" element={<BorrowedBookList />} />
        <Route path="/Books_List" element={<BooksList />} />
        <Route path="/book_Details/:id" element={<BookDetails />} />
        <Route path="/create_book" element={<CreateBook />} />
        <Route path="/update_book" element={<UpdateBook />} />
        <Route path="/user_list" element={<AllUserList />} />
        <Route path="/user_details/:id" element={<UserDetails />} />
        <Route path="/bulk_upload" element={<BulkUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
