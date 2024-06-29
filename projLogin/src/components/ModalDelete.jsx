import React, { useState } from "react";
import "./Modal.css";

const ButtonDelete = ({ id }) => {
    const [modalDelete, setModal] = useState(false);

    const ModalOff = () => {
        setModal(false);
    }
    const ModalOn = () => {
        setModal(true);
    }

    return (
        <>
            <button className="outline-button btn-red" onClick={ModalOn}>Deletar</button>
            {modalDelete && <ModalDelete ModalOff={ModalOff} id={id} />}
        </>
    );
}

const ModalDelete = ({ ModalOff, id }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/consumer/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('User Delete successfully!');
                ModalOff();
            } else {
                setMessage(`Error: ${data}`);
            }
        } catch (error) {
            console.log('aqui');
            setMessage(`Error: ${error.message}`);
        }

    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={ModalOff}>
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <h3>Deseja excluir o cliente?</h3>
                    <div className="container-btn">
                        <button className="outline-button btn-blue" type="button" onClick={ModalOff}>Não</button>
                        <button className="outline-button btn-red" type="submit">Sim</button>
                    </div>
                </form>
                {message}
            </div>
        </div>
    );
}

export default ButtonDelete;