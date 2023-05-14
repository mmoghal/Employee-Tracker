const { connection } = require('../connection');

const updateEmployeeRole = (employeeId, roleId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [roleId, employeeId], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  updateEmployeeRole
};
