import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentPage from './pages/StudentPage';
import Profile from './pages/StudentProfile';
import Attendance from './pages/Attendance';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          
          <MainLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/students" element={
                <ProtectedRoute>
                  <StudentPage />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />
              
              <Route path="/add" element={
                <ProtectedRoute>
                  <FormPage />
                </ProtectedRoute>
              } />
              
              <Route path="/edit/:id" element={
                <ProtectedRoute>
                  <FormPage />
                </ProtectedRoute>
              } />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
