import React, { useState, useEffect } from "react";
import "./Modal.css";

const ButtonEdit = ({ id }) => {
    const [modalEdit, setModal] = useState(false);

    const ModalOff = () => {
        setModal(false);
    }
    const ModalOn = () => {
        setModal(true);
    }

    if (modalEdit) return <ModalEdit ModalOff={ModalOff} id={id}></ModalEdit>;

    return (
        <button onClick={ModalOn}>Editar</button>
    );
}

const ModalEdit = ({ ModalOff }, { id }) => {
    const Id = id;
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('Ativo');
    const [message, setMessage] = useState('');

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/consumerupd/?' + Id);
            const data = await response.json();

            data.map((x) => {
                return (() => {
                    setName(x.name);
                    setLastName(x.lastName);
                    setEmail(x.email);
                    setPhone(x.phone);
                    setStatus(x.status);
                });
            })
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        let active;
        if (status === 'Ativo') { active = true; }
        else { active = false; }
        try {
            const response = await fetch('http://localhost:5000/api/consumer/?' + Id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastName, email, phone, active }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('User Updated successfully!');
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
        ModalOff();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={ModalOff}>
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
                    <button type="submit">Atualizar Cliente</button>
                </form>
                {message}
            </div>
        </div>
    );
}

export default ButtonEdit;