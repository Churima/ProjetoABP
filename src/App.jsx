import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import Cronometro from './Cronometro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cronometro" element={<Cronometro />} />
      </Routes>
    </Router>
  );
}

export default App;
