const inquirer = require('inquirer');
const express = require('express');
const router = express.Router();
const db = require('./db/connection');
const cTable = require('console.table');

// Questions for user input
const startupQuestion = {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
};

const addDepartment = {
    type: 'input',
    name: 'department',
    message: 'What is the name of the department?'
}

const addRole = {
    type: 'input',
    name: 'department',
    message: 'What is the title of the role?'
}

// Function to pull startup choice and pass info into result
const listOptions = async () => {
    let inq = await inquirer.prompt(startupQuestion);
    let answer = String(inq.action);
    
    return new Promise((resolve, reject) => {
        if (answer === 'View all departments') {
            getDepartments(depts);
            console.log(depts);
            // let table = cTable.getTable(depts);
            // console.log(table);
        } else if (answer === 'Add a department') {
            let inqDept = inquirer.prompt(addDepartment);
            
        } else if (answer === 'Add a role') {
            inquirer.prompt(addRole);
        }
    })
};

// Function call to initialize app
listOptions();
