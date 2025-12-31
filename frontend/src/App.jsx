import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { FaHeart, FaHome, FaPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import ToastContainer from './components/ToastContainer';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <Router>
      <div className="app">
        <ToastContainer />
        {currentUser ? (
          <>
            <header className="app-header">
              <div className="header-left">
                <FaHeart className="love-icon" />
                <h1>Social Media</h1>
              </div>
              <nav className="header-nav">
                <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <FaHome />
                </NavLink>
                <NavLink to="/post" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <FaPlus />
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <FaUser />
                </NavLink>
                <button onClick={handleLogout} title="Logout" className="nav-link logout-btn">
                  <FaSignOutAlt />
                </button>
              </nav>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home currentUser={currentUser} />} />
                <Route path="/post" element={<Post currentUser={currentUser} />} />
                <Route path="/profile" element={<Profile currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>

            <footer className="app-footer">
              <div className="footer-content">
                <div className="footer-section">
                  <h4>Social Media App</h4>
                  <p>Connect, share, and discover amazing moments with people around the world.</p>
                </div>
                <div className="footer-section">
                  <h4>Features</h4>
                  <ul>
                    <li>📸 Photo & Video Sharing</li>
                    <li>👥 User Interactions</li>
                    <li>🔍 Content Discovery</li>
                    <li>📊 Analytics Dashboard</li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Support</h4>
                  <ul>
                    <li>📧 Help Center</li>
                    <li>🛡️ Privacy Policy</li>
                    <li>📋 Terms of Service</li>
                    <li>📞 Contact Us</li>
                  </ul>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 Social Media App. All rights reserved. Made with ❤️ for sharing moments.</p>
              </div>
            </footer>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;