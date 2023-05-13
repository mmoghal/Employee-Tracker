const inquirer = require('inquirer');
const {
  getAllDepartments,
  addDepartment,
  getAllRoles,
  addRole,
  getAllEmployees,
  addEmployee
} = require('./database');

// Function to display main menu and prompt user for action
const promptMainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'Add a department',
          'View all roles',
          'Add a role',
          'View all employees',
          'Add an employee',
          'Exit'
        ]
      }
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'Add a department':
          promptAddDepartment();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add a role':
          promptAddRole();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add an employee':
          promptAddEmployee();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
};

// Function to view all departments
const viewAllDepartments = () => {
  getAllDepartments()
    .then((departments) => {
      console.table(departments);
      promptMainMenu();
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      promptMainMenu();
    });
};

// Function to prompt user for department details and add a department
const promptAddDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ])
    .then((answers) => {
      addDepartment(answers)
        .then((departmentId) => {
          console.log(`Department added with ID ${departmentId}`);
          promptMainMenu();
        })
        .catch((error) => {
          console.error('Error occurred:', error);
          promptMainMenu();
        });
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      promptMainMenu();
    });
};

// Function to view all roles
const viewAllRoles = () => {
  getAllRoles()
    .then((roles) => {
      console.table(roles);
      promptMainMenu();
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      promptMainMenu();
    });
};

// Function to prompt user for role details and add a role
const promptAddRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:'
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:'
        }
      ])
      .then((answers) => {
        addRole(answers)
          .then((roleId) => {
            console.log(`Role added with ID ${roleId}`);
            promptMainMenu();
          })
          .catch((error) => {
            console.error('Error occurred:', error);
            promptMainMenu();
          });
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        promptMainMenu();
      });
  };
  