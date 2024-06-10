import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Log.css';

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar os dados da última pessoa criada armazenados no localStorage
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      const parsedUser = JSON.parse(lastUser);
      setName(parsedUser.name);
      setPassword(parsedUser.password);
    }
  }, []);

  const handleLogin = () => {
    // Verificar se o nome de usuário e a senha correspondem à última pessoa criada
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      const parsedUser = JSON.parse(lastUser);
      if (parsedUser.name === name && parsedUser.password === password) {
        navigate('/messages', { state: { userName: name } });
        return;
      }
    }
    alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Confirmar</button>
      <p>
        Ainda não tem uma conta? <a href="/SignUp">Criar novo usuário</a>
      </p>
    </div>
  );
}

export default LoginPage;
