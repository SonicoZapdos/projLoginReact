import React, { useState, useEffect } from 'react';
import ModalCreate from '../components/ModalCreateUser';
import "./Login.css";
import { changeUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalCreate, setModalCreate] = useState(false);
  const dispatch = useDispatch();

  const ModalCreateOff = () => {
    setModalCreate(false);
  }

  const ModalCreateOn = () => {
    setModalCreate(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        if (data.length == 1) {
          setMessage('Verificado com Sucesso');
          dispatch(changeUser(data));
        } else {
          setMessage('Usuário ou Senha Incorretos, por favor tente novamente!!!');
          console.log(data);
        }
      } else {
        setMessage(`Error Data: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='container'>
      <div className='title'>
        <img src='https://miro.medium.com/v2/resize:fit:600/1*TgoMPiglCrXtiZAhj4SfrQ.png' alt='Logo' />
        <h1>WorkFlow</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email: </label>
          <input type="text" className="inputForm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu Email" />
        </div>
        <div className="field">
          <label>Senha: </label>
          <input type="text" className="inputForm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua Senha" />
        </div>
        <h5 className="text">Esqueceu a Senha?</h5>
        <button className="btn-login" type="submit">Entrar</button>
      </form>
      <h5 className="text">Ainda não possui cadastro? <button onClick={ModalCreateOn} className='btn-noconfig' id='btn-link'>Cadastre Aqui!</button></h5>
      {message && <p>{message}</p>}
      <ModalCreate modalCreate={modalCreate} ModalCreateOff={ModalCreateOff} />
    </div>
  );
}


export default Login;