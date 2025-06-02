const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the SQLite database file
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Export the database connection for use in other modules
module.exports = db;