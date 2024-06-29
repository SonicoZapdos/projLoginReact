// api/crud.js
import db from "./db.js";

const insertConsumer = (name, lastName, email, phone, active, callback) => {
  if (name == null || email == null || lastName == null || phone == null) {
    return callback(new Error("Nome, Email, Sobrenome ou Telefone não foram preenchidos!!!"));
  }

  const query = `INSERT INTO consumer (name, lastName, email, phone, active) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, lastName, email, phone, active], function (err) {
    if (err) {
      return callback(err);
    }
    return callback(null, { id: this.lastID, name, lastName, email, phone, active });
  });
};

const getConsumers = (callback) => {
  const query = `SELECT * FROM consumer`;
  db.all(query, [], (err, rows) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, rows);
  });
};

const getConsumer = (id, callback) => {
    const query = `SELECT * FROM consumer WHERE id = ?`;
    db.all(query, [id], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  };

const updateConsumer = (id, name, lastName, email, phone, active, callback) => {
  const query = `UPDATE consumer SET name = ?, lastName = ?, email = ?, phone = ?, active = ? WHERE id = ?`;
  db.run(query, [name, lastName, email, phone, active, id], function (err) {
    if (err) {
      console.log("Erro ao atualizar consumidor:", err.message);
      return callback(err);
    }
    callback(null, {name, lastName, email, phone, active});
  });
};

const deleteConsumer = (id, callback) => {
  const query = `DELETE FROM consumer WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, {id});
  });
};

export { insertConsumer, getConsumers, getConsumer, updateConsumer, deleteConsumer };
