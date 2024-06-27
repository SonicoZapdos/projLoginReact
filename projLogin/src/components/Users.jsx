import React, { useEffect, useState } from 'react';
import "./Users.css";

function Users () {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Ultimo Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Status</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((x) => {
            return <tr>
              <th>{x.name}</th>
              <th>{x.lastName}</th>
              <th>{x.email}</th>
              <th>{x.phone}</th>
              <th>{x.active}</th>
              <th>Editar/Deletar</th>
            </tr>
          }
          )
        }
      </tbody>
    </table>
  );
};

export default Users;
