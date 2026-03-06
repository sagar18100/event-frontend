import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import QuizView from './pages/QuizView';

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <div className="page-wrapper">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/module/:id" element={<ModuleView />} />
              <Route path="/quiz/:moduleId" element={<QuizView />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
