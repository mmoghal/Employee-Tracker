const { connection } = require('../connection');

// Function to get all employees
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
    connection.query(query, (err, employees) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(employees);
    });
  });
};

// Function to add a new employee
const addEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO employee SET ?';
    connection.query(query, employee, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });
};

module.exports = {
  getAllEmployees,
  addEmployee
};
