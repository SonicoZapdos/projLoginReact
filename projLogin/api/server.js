// api/server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as consumer from "./consumerController.js";
import * as user from "./userController.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

/* - - - API CONSUMER - - - */ 

// Rota para obter todos os usuários
app.get("/api/consumers", (req, res) => {
  consumer.getConsumers((err, consumer) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(consumer);
  });
});

// Rota para obter um usuário por ID
app.get('/api/consumer/:id', (req, res) => {
  const { id } = req.params;
  consumer.getConsumer(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(user);
  });
});

// Rota para adicionar um novo usuário
app.post("/api/consumeradd", (req, res) => {
  const { name, lastName, email, phone, active } = req.body;

  // Validação dos campos obrigatórios
  if (!name || !lastName || !email || !phone) {
    return res.status(400).json({ error: "Nome, Sobrenome, Email ou Telefone não foram preenchidos!!!" });
  }

  consumer.insertConsumer(name, lastName, email, phone, active, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(user);
  });
});

// Rota para atualizar um usuário existente
app.put("/api/consumer/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, phone, active } = req.body;

  // Validação dos campos obrigatórios
  if (!name || !lastName || !email || !phone) {
    return res.status(400).json({ error: "Nome, Sobrenome, Email ou Telefone não foram preenchidos!!!" });
  }

  consumer.updateConsumer(id, name, lastName, email, phone, active, (err, user) => {
    if (err) {
      console.log("Erro ao atualizar consumidor:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json(user);
  });
});

// Rota para deletar um usuário
app.delete("/api/consumer/:id", (req, res) => {
  const { id } = req.params;
  consumer.deleteConsumer(id, (err) => {
    if (err) {
      console.log("Erro ao atualizar consumidor:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).send();
  });
});

/* - - - API USUARIO - - - */

app.get("/api/users", (req, res) => {
  user.getUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users);
  });
});

// Rota para obter um usuário por ID
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  user.getUser(id, (err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users);
  });
});

// Rota para adicionar um novo usuário
app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  user.insertUser(name, email, (err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json(users);
  });
});

// Rota para atualizar um usuário existente
app.put("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  user.updateUser(id, name, email, (err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users);
  });
});

// Rota para deletar um usuário
app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  user.deleteUser(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});

// Rota para obter a verificação do login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  user.verifyLogin(email, password, (err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

