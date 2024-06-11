import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import SignUp from './SignUp';
import Cronometro from './Cronometro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/cronometro" element={<Cronometro />} />
      </Routes>
    </Router>
  );
}

export default App;
