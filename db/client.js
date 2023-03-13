const { Client } = require('pg');

// bring in process dotenv
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString
});

module.exports = client;
