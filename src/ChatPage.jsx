import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const location = useLocation();
  const { userName } = location.state || { userName: 'Usuário' };
  const [messages, setMessages] = useState([
    { sender: 'Atendente', text: 'Você vai querer como professor o Lucas ou o Gilberto?', type: 'atendente' },
    { sender: 'Eu', text: 'Lucas, Gilberto só serve de coordenador.', type: 'cliente' },
    { sender: 'Atendente', text: 'Certo, já está escolhido então!', type: 'atendente' },
    { sender: 'Eu', text: 'Muito obrigado!', type: 'cliente' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'Eu', text: newMessage, type: 'cliente' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="conteudo">
      <header>Bem-vindo, {userName}!</header>
      <div className="conversa">
        {messages.map((message, index) => (
          <div key={index} className={`mensagem ${message.type}`}>
            <div className={message.type === 'cliente' ? 'eu' : ''}>{message.sender}</div>
            {message.text}
          </div>
        ))}
      </div>
      <footer>
        <textarea
          id="mensagemInput"
          placeholder="Digite sua mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button id="enviarBtn" onClick={handleSendMessage}>
          Enviar
        </button>
      </footer>
    </div>
  );
}

export default ChatPage;
