-- sample departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering');

-- sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 60000, 1),
  ('Sales Representative', 40000, 1),
  ('Marketing Manager', 55000, 2),
  ('Marketing Specialist', 35000, 2),
  ('Software Engineer', 80000, 3),
  ('Quality Assurance Engineer', 60000, 3);

-- sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, NULL),
  ('Emily', 'Williams', 4, 3),
  ('David', 'Brown', 5, NULL),
  ('Jessica', 'Taylor', 6, 5);
