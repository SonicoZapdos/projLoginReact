import React, { useState } from "react";
import Users from "../components/Users";
import ModalCreate from "../components/ModalCreateConsumer";
import "../components/Modal.css";
import "./MainPage.css";

function MainPage({ person, isLoggedInChange }) {
    const [modalCreate, setModalCreate] = useState(false);

    const ModalCreateOff = () => {
        setModalCreate(false);
    }

    const ModalCreateOn = () => {
        setModalCreate(true);
    }

    console.log(person);
    return (
        <div className="container MainPage">
            <div className="header">
                <h2>Clientes</h2>
                <div className="perfil">
                    <span class="material-symbols-outlined">
                        account_circle
                    </span>
                    <h2>{person.map((x) => x.name)} {person.map((x) => x.lastName)}</h2>
                    <button className="btn-noconfig" onClick={isLoggedInChange}>
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                    </button>
                </div>
            </div>
            <div className="main">
                <button className="outline-button btn-green" onClick={ModalCreateOn}>Criar Cliente</button>
                <Users />
            </div>
            <ModalCreate modalCreate={modalCreate} ModalCreateOff={ModalCreateOff} />
        </div>
    );
}

export default MainPage;