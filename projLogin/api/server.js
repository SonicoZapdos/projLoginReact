// api/server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as users from "./userController.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Rota para obter todos os usuários
app.get("/api/users", (req, res) => {
  users.getUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users);
  });
});

// Rota para obter a verificação do login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  users.verifyLogin(email, password, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(user);
  });
});

// Rota para obter um usuário por ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users.getUser(id, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(user);
  });
});

// Rota para adicionar um novo usuário
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  users.insertUser(name, email, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json(user);
  });
});

// Rota para atualizar um usuário existente
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  users.updateUser(id, name, email, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(user);
  });
});

// Rota para deletar um usuário
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users.deleteUser(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

