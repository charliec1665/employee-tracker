const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // Methods to connect to db
    // findAll department
    viewDepartments () {
        return this.connection.promise().query('SELECT * FROM department')
    }
    // findAll roles
    viewRoles () {
        return this.connection.promise().query('SELECT * FROM role')
    }
    // findAll employees
    viewEmployees () {
        return this.connection.promise().query('SELECT * FROM employee')
    }
    // create department
    createDepartment (department) {
        return this.connection.promise().query('INSERT INTO department SET ?', department)
    }
    // create role
    createRole (role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role)
    }
    // create employee
    createEmployee (employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee)
    }
    // update employee role
    updateEmployeeRole (role, id) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [role, id])
    }
    // update employee manager role
    updateEmployeeManager (employee_id, manager_id) {
        return this.connection.promise().query('UPDATE employee SET manager_id = ? WHERE id =?', [manager_id, employee_id])
    }
}

module.exports = new DB(connection);