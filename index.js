// global variable - call in files
const { prompt } = require('inquirer'); 
const db = require('./db');
require('console.table');


// function to run inquirer prompts, .then with a switch statement
function initPrompt() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPT'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_ROLE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_DEPTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_ROLE':
                updateRole();
                break;
            default: 
                quit();
        }
    })
}

// Create Functions
// View All Departments
function viewDepartments() {
    db.viewDepartments().then(departments => {
        console.table(departments[0]);
        initPrompt();
    })
}

// Add a Department
function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then(res => {
        let name = res;

        db.createDepartment(name).then(viewDepartments())
    })
}

// View All Roles
function viewRoles() {
    db.viewRoles().then(roles => {
        console.table(roles[0]);
        initPrompt();
    })
}

// Add a Role
function addRole() {
    prompt([
        {
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            name: 'department_id',
            message: 'What is the corresponding department id?'
        }
    ]).then(res => {
        // object of variables to match schema
        const roleInfo = {
            title: res.title,
            salary: res.salary,
            department_id: res.department_id
        }
        db.createRole(roleInfo)
        .then(viewRoles())
    })
}

// View All Employees
function viewEmployees() {
    db.viewEmployees().then(employees => {
        console.table(employees[0]);
        initPrompt();
    })
}

// Add an Employee
function addEmployee() {
    prompt([
        {
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'role',
            message: 'What is the role id of the employee?'
        },
        {
            name: 'manager_id',
            message: `What is the id of the employee's manager?`
        }
    ]).then(res => {
        // object of variables to match schema
        const employeeInfo = {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager_id: res.manager_id
        }
        db.createEmployee(employeeInfo)
        .then(viewEmployees())
    })
}

// NOT CURRENTLY FUNCTIONING
function updateRole() {
    // query to database to findAll employees
    db.viewEmployees().then(res => {
        console.table(res);
        // put employees into array of objects
        const employees = [{res}] // I know this is incorrect but I could not figure out how to separate out each employee
        // prompt user to choose employee
        prompt([
            {
                name: 'employee_name',
                message: `Which employee's role do you want to update?`,
                choices: [employees]
            }
        ])
    }).then(res => {
        // query to database to findAll roles
        db.viewRoles().then(res => {
            // put roles into array of objects
            const roles = [{res}]
            // prompt user to choose role
            prompt([
                // separate prompt for role
                {
                    name: 'new_role',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: [roles]
                }
            ])
        })
    }).then(res => {
        // put results from first two prompts into object of variables
        const updatedRoleInfo = {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id
        }
        db.updateRole(res).then(viewRoles());
    })
    // second query to find the managers in order to select
    // prompt to set manager for role
    // second .then
        // db.updateEmployeeManager
}

initPrompt();