const { application } = require('express');
const inquirer = require('inquirer');
const generateTable = require('./utils/generateTable');

// Array of questions for user input
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

const addingDepartment = async () => {
    let inq1 = await inquirer.prompt(startupQuestion);
    let answer = String(inq1.action);
    console.log(answer);
    
    return new Promise( (resolve, reject) => {
        if (answer === 'Add a department') {
            inquirer.prompt(addDepartment);
        } else if (answer === 'Add a role') {
            inquirer.prompt(addRole);
        }
    })
};

// Function call to initialize app
addingDepartment();
