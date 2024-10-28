import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import PasswordChange from './components/PasswordChange';
import CreateTrade from './components/CreateTrade';
import BrowseTrades from './components/BrowseTrades';
import SignUpPage from './components/SignUpPage';
import ViewTrade from './components/ViewTrade';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <SignInPage />
        }/>
        <Route path="/sign-up" element={
          <SignUpPage/>
        }/>
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }/>
        <Route path="/change-password" element={
          <ProtectedRoute>
            <PasswordChange />
          </ProtectedRoute>
        }/>
        <Route path="/create-trade" element={
          <ProtectedRoute>
            <CreateTrade />
          </ProtectedRoute>
        } />
        <Route path="/browse" element={
          <ProtectedRoute>
            <BrowseTrades />
          </ProtectedRoute>
        } />
        <Route path="/trades/view-trade" element={
          <ProtectedRoute>
            <ViewTrade />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
