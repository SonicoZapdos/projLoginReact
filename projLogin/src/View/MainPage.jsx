import React from "react";
import Users from "../components/Users";
import "./MainPage.css";

function MainPage({ person }) {
    console.log(person);
    return (
        <div className="container MainPage">
            <div className="header">
                <h2>Clientes</h2>
                <div className="perfil">
                    <img src="..." alt="Perfil" className="picture" />
                    <h5>{person.map((x) => x.name)} {person.map((x) => x.lastName)}</h5>
                </div>
            </div>
            <div className="main">
                <Users />
            </div>
        </div>
    );
}

export default MainPage;