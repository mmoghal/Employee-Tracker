const connection = require('../connection');

// Function to get all roles
const getAllRoles = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    connection.query(query, (err, roles) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(roles);
    });
  });
};

// Function to add a new role
const addRole = (role) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO role SET ?';
    connection.query(query, role, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });
};

module.exports = {
  getAllRoles,
  addRole
};
