const express = require('express');
const mysql = require('mysql');
const app = express();

require('dotenv').config();

// Função para tentar conectar ao banco de dados com retentativas
function connectToDatabase(callback) {
  const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      setTimeout(() => connectToDatabase(callback), 2000); // Tenta novamente após 2 segundos
    } else {
      console.log('Conexão bem-sucedida ao banco de dados');
      callback(connection); // Chame a função de retorno de chamada passando a conexão
    }
  });

  connection.on('error', (err) => {
    console.error('Erro de conexão com o banco de dados:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase(callback); // Reconectar em caso de conexão perdida
    } else {
      throw err;
    }
  });
}

// Rota para buscar produtos
app.get('/produtos', (req, res) => {
  // Conectar ao banco de dados
  connectToDatabase((dbConnection) => {
    dbConnection.query('SELECT * FROM produtos', (err, results) => {
      if (err) {
        dbConnection.end(); // Certifique-se de encerrar a conexão em caso de erro
        throw err;
      }
      res.json(results);
      dbConnection.end(); // Encerre a conexão após enviar os resultados
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
