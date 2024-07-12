import db from "./db.js";

  const insertUser = (name, lastName, email, password, callback) => {
    if (name == null || lastName == null || email == null || password == null) {
      return callback(new Error("Nome, Email, Sobrenome ou Senha não foram preenchidos!!!"));
    }
  
    const query = `INSERT INTO user (name, lastName, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, lastName, email, password], function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null, {user: {name, lastName, email, password} });
    });
  };

  const verifyLogin = (email, password, callback) => {
    const query = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.all(query, [email, password], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  };
  
  const getUsers = (callback) => {
    const query = `SELECT * FROM user`;
    db.all(query, [], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  };
  
  const getUser = (id, callback) => {
      const query = `SELECT * FROM user WHERE = ?`;
      db.all(query, [id], (err, rows) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    };
  
  const updateUser = (id, name, lastName, email, phone, active, callback) => {
    const query = `UPDATE user SET name = ?, lastName = ?, email = ?, phone = ?, active = ? WHERE id = ?`;
    db.run(query, [name, lastName, email, phone, active, id], function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  };
  
  const deleteUser = (id, callback) => {
    const query = `DELETE FROM user WHERE id = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  };
  
  export { insertUser, verifyLogin, getUsers, getUser, updateUser, deleteUser };

