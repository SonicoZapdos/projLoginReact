import React, { useState } from "react";
import Users from "../components/Users";
import ModalCreate from "../components/ModalCreateConsumer";
import "../components/Modal.css";
import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../Redux/userSlice";

function MainPage() {
    const [modalCreate, setModalCreate] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector(selectUser); 

    const ModalCreateOff = () => {
        setModalCreate(false);
    }

    const ModalCreateOn = () => {
        setModalCreate(true);
    }

    const Logout = () => {
        dispatch(logout());
    }

    return (
        <div className="container MainPage">
            <div className="header">
                <h2>Clientes</h2>
                <div className="perfil">
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                    <h2>{user.map((x) => x.name)} {user.map((x) => x.lastName)}</h2>
                    <button className="btn-noconfig" onClick={Logout}>
                        <span className="material-symbols-outlined">
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