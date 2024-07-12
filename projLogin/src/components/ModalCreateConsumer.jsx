import React, { useState } from "react";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { changeConsumer } from "../Redux/consumerSlice";

const ModalCreate = ({ modalCreate, ModalCreateOff }) => {
    if (!modalCreate) {
        return null;
    }
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('Ativo');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        let active;
        if (status === 'Ativo') { active = true; }
        else { active = false; }
        try {
            const response = await fetch('http://localhost:5000/api/consumeradd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastName, email, phone, active }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('User created successfully!');
                ModalCreateOff();
                dispatch(changeConsumer());
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
                        <label>Phone: </label>
                        <input type="text" className="inputForm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Digite seu Telefone" />
                    </div>
                    <div className="field">
                        <label>Status: </label>
                        <select className="inputForm" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Desativado">Desativado</option>
                        </select>
                    </div>
                    <button className="outline-button btn-green" type="submit">Criar Cliente</button>
                </form>
                {message}
            </div>
        </div>
    );
}

export default ModalCreate;