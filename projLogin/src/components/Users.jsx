import React, { useEffect, useState } from 'react';
import BtnEdit from './ModalEdit';
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchConsumers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/consumers');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err.error);
    }
  };

  useEffect(() => {
    // Buscar consumidores ao montar o componente
    fetchConsumers();

    // Configurar polling
    const intervalId = setInterval(() => {
      fetchConsumers();
    }, 5000); // Polling a cada 5 segundos

    // Limpar o interval ao desmontar o componente
    return () => {
      clearInterval(intervalId);
    };
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
            return <tr key={x.id}>
              <th>{x.name}</th>
              <th>{x.lastName}</th>
              <th>{x.email}</th>
              <th>{x.phone}</th>
              <th>{x.active}</th>
              <th><BtnEdit id={x.id} />/Deletar</th>
            </tr>
          }
          )
        }
      </tbody>
    </table>
  );
};

export default Users;
