import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';
import { BooksList } from './component/user/books/BooksList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/BooksList" element={<BooksList/>} />
      </Routes>
    </Router>
  );
}

export default App;
