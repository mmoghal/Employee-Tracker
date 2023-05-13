const inquirer = require('inquirer');
const {
  getAllDepartments,
  addDepartment,
  getAllRoles,
  addRole,
  getAllEmployees,
  addEmployee
} = require('./database');