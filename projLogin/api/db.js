import sqlite3 from 'sqlite3';

// Definir o caminho do banco de dados
const dbPath = './spring.db';

// Conectar ao banco de dados (o arquivo será criado se não existir)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    createTableConsumer();
    createTableUser();

    insertExempleUser();
  }
});

// Função para criar uma tabela
const createTableConsumer = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS consumer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT  NOT NULL,
      phone TEXT,
      active BOOL
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela "consumer" criada ou já existe.');
    }
  });
};

const createTableUser = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT  NOT NULL,
      password TEXT NOT NULL
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela "user" criada ou já existe.');
    }
  });
};

const insertExempleConsumer = () => {
  const query = `
    INSERT INTO consumer (id,name, lastName, email, phone, active) VALUES ( 1,'John','Joestar','john@gmail.com','27992881332',false)
  `;
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar usuario:', err.message);
    } else {
      console.log('usuario criado ou já existe.');
    }
  });
};

const insertExempleUser = () => {
  const query = `
    INSERT INTO user (id,name, lastName, email, password) VALUES ( 1,'John','Joestar','john@gmail.com','1234')
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
