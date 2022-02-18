const { Client } = require('pg');

const client = new Client({ 
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123", 
  database: "db_clientes",
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
})

module.exports = client;