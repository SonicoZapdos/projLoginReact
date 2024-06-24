import sqlite3 from 'sqlite3';

// Definir o caminho do banco de dados
const dbPath = './spring.db';

// Conectar ao banco de dados (o arquivo será criado se não existir)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    createTable();
  }
});

// Função para criar uma tabela
const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT  NOT NULL,
      phone TEXT,
      password TEXT NOT NULL,
      active BOOL
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela "users" criada ou já existe.');
    }
  });
};

const insertExemple = () => {
  const query = `
    INSERT INTO users (id,name, lastName, email, phone, password, active) VALUES ( 1,'John','Joestar','john@gmail.com','27992881332','1234', false)
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar usuario:', err.message);
    } else {
      console.log('usuario criado ou já existe.');
    }
  });
};

export default db;
