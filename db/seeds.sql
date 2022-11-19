USE employee_tracker

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 50000, 1),
    ('Assistant Mananger', 42000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Lorelai', 'Gilmore', 1, NULL),
    ('Michel', 'Gerard', 2, 1);