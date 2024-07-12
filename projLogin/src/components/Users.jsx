import React, { useEffect, useState } from 'react';
import BtnEdit from './ModalEdit';
import BtnDelete from './ModalDelete';
import "./Users.css";
import { useSelector } from 'react-redux';

function Users() {
  const state = useSelector(state => state.consumer);
  const [consumer, setConsumer] = useState({});

  const fetchConsumers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/consumers');
      return await response.json();
    } catch (err) {
      console.log(err.error);
      return null;
    }
  };

  useEffect(() => {
    setConsumer(fetchConsumers());
  })
  return (
    <div className="container-table">
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
          consumer.map((x) => {
            return <tr key={x.id}>
              <th>{x.name}</th>
              <th>{x.lastName}</th>
              <th>{x.email}</th>
              <th>{x.phone}</th>
              <th>{x.active}</th>
              <th><BtnEdit id={x.id} /> / <BtnDelete id={x.id} /></th>
            </tr>
          }
          )
        }
      </tbody>
    </table>
    </div>
  );
};

export default Users;
