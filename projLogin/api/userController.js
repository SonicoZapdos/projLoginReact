// api/crud.js
import db from "./db.js";

const insertUser = (name, lastName, email, phone, password, callback) => {
  if (name != null && email != null && password != null) {
    const query = `INSERT INTO users (name, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [name, lastName, email, phone, password], function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID, name, email });
    });
  }
  callback("Nome, Email ou Senha não foram preenchidos!!!");
};

const getUsers = (callback) => {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, rows);
  });
};

const getUser = (id, callback) => {
    const query = `SELECT * FROM users WHERE = ?`;
    db.all(query, [id], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  };

const verifyLogin = (email, password, callback) => {
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.all(query, [email, password], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  };

const updateUser = (id, name, lastName, email, phone, password, callback) => {
  const query = `UPDATE users SET name = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE id = ?`;
  db.run(query, [name, lastName, email, phone, password, id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

const deleteUser = (id, callback) => {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

export { insertUser, verifyLogin, getUser, getUsers, updateUser, deleteUser };
