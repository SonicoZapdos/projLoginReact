import React, { useState, useEffect } from 'react';
import "./Login.css";

function Login({ isLoggedInChange }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: { "email": email, "password": password },
          });
          const data = await response.json();
          if (response.ok) {
            if (data) {
              setMessage('Login successful!');
              console.log('opaaaa');
              alert('teste');
              // Faça algo com os dados do usuário, por exemplo, redirecionar para uma página
            } else {
              setMessage('Invalid credentials. Please try again.');
              alert('teste');
            }
          } else {
            setMessage(`Error: ${data.error}`);
          }
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        }
      };

    return (
        <div className='container'>
            <div className='title'>
                <img src='...' alt='Logo' />
                <h1>WorkFlow</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>Email: </label>
                    <input type="text" className="inputForm" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Digite seu Email"/>
                </div>
                <div className="field">
                    <label>Senha: </label>
                    <input type="text" className="inputForm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua Senha"/>
                </div>
                <h5 className="text">Esqueceu a Senha?</h5>
                <button className="btn-login" type="submit">Entrar</button>
            </form>
            <h5 className="text">Ainda não possui cadastro? Cadastre Aqui!</h5>
            {message && <p>{message}</p>}
        </div>
    );
}


export default Login;