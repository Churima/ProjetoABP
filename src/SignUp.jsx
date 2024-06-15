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
      
      const newUser = { name, password };
      localStorage.setItem('lastUser', JSON.stringify(newUser));

      console.log('Registro realizado com sucesso!');
      
      alert('Conta criada chefia!');
      navigate('/');
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
