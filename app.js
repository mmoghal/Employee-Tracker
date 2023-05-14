const inquirer = require('inquirer');
const { getAllDepartments, addDepartment } = require('./database/department');
const { getAllEmployees, addEmployee, updateEmployeeRole } = require('./database/employee');
const { getAllRoles, addRole } = require('./database/role');

const { connectToDatabase, connection } = require('./connection');

const afterConnection = () => {
  const logo = `
  ██████╗ ███████╗██╗     ██╗      ██████╗ ███████╗███████╗
  ██╔══██╗██╔════╝██║     ██║     ██╔═══██╗██╔════╝██╔════╝
  ██║  ██║█████╗  ██║     ██║     ██║   ██║█████╗  █████╗  
  ██║  ██║██╔══╝  ██║     ██║     ██║   ██║██╔══╝  ██╔══╝  
  ██████╔╝███████╗███████╗███████╗╚██████╔╝███████╗███████╗
  ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝
  `;
  
  console.log(logo);
  console.log('\x1b[1m%s\x1b[0m', 'Welcome to Employee Database Manager!\n');
  // Your application logic goes here
};

connectToDatabase()
  .then(() => {
    afterConnection();
    // Call other functions or start the main menu prompt here
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

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
          'Update an employee role',
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
        case 'Update an employee role':
          promptUpdateEmployeeRole();
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
  
    
    // Function to view All Employees
    const viewAllEmployees = () => {
      getAllEmployees()
        .then((employees) => {
          console.table(employees);
          promptMainMenu();
        })
        .catch((error) => {
          console.error('Error occurred:', error);
          promptMainMenu();
        });
    };
    
    // Function to prompt user for employee details and add an employee
    const promptAddEmployee = () => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
          },
          {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID of the employee:'
          },
          {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID of the employee (leave empty if no manager):',
            default: null
          }
        ])
        .then((answers) => {
          addEmployee(answers)
            .then((employeeId) => {
              console.log(`Employee added with ID ${employeeId}`);
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
    
    // Function to prompt user for employee and new role details and update the employee's role
    const promptUpdateEmployeeRole = () => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee whose role you want to update:'
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter the ID of the new role:'
          }
        ])
        .then((answers) => {
          const { employeeId, roleId } = answers;
          updateEmployeeRole(employeeId, roleId)
            .then(() => {
              console.log('Employee role updated successfully!');
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
    
    // Prompt the main menu to start the application
    promptMainMenu();
    
