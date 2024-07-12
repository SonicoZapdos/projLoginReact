import React, { useState } from "react";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { changeUser } from "../Redux/userSlice";

const ModalCreate = ({ modalCreate, ModalCreateOff }) => {
    if (!modalCreate) {
        return null;
    }
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        console.log(JSON.stringify({ name, lastName, email, password }));

        try {
            const response = await fetch('http://localhost:5000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastName, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('User created successfully!');
                ModalCreateOff();
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={ModalCreateOff}>
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Nome: </label>
                        <input type="text" className="inputForm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu Nome" />
                    </div>
                    <div className="field">
                        <label>Ultimo Nome: </label>
                        <input type="text" className="inputForm" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Digite seu o Ultimo Nome" />
                    </div>
                    <div className="field">
                        <label>Email: </label>
                        <input type="text" className="inputForm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu Email" />
                    </div>
                    <div className="field">
                        <label>Senha: </label>
                        <input type="text" className="inputForm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite seu Telefone" />
                    </div>
                    <button className="outline-button btn-green" type="submit">Criar Usuario</button>
                </form>
                {message}
            </div>
        </div>
    );
}

export default ModalCreate;