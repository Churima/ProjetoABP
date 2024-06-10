import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Log.css';

function SignUp() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password === confirmPassword && name.trim() && password.trim()) {
      console.log('Registro realizado com sucesso!');
      // Navegue para a página de login
      navigate('/LoginPage');
    } else {
      alert('As senhas não correspondem ou algum campo está em branco.');
    }
  };

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite uma senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua senha novamente"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Confirmar</button>
      <p>
        Já tem uma conta? <a href="/">Entrar</a>
      </p>
    </div>
  );
}

export default SignUp;
