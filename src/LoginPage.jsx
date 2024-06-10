import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Log.css';

function LoginPage() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim() && password.trim()) {
      navigate('/messages', { state: { userName: name } });
    }
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
