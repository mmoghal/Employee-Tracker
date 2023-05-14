const { connection } = require('../connection');

// Function to get all departments
const getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, departments) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(departments);
    });
  });
};

// Function to add a new department
const addDepartment = (department) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO department SET ?';
    connection.query(query, department, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });
};

module.exports = {
  getAllDepartments,
  addDepartment
};
