const mysql = require('mysql2');

// Connect to mysql database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_tracker'
    },
    console.log('Connected to employee_tracker database.')
);

module.exports = connection;