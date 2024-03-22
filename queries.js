const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company_management",
});

// Function to view all departments
async function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
}

// Function to view all roles
async function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
}

// Function to view all employees
async function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the department:",
  });

  connection.query(
    "INSERT INTO department (name) VALUES (?)",
    [name],
    function (err, result) {
      if (err) throw err;
      console.log("Department added successfully!");
    }
  );
}

// Function to add a role
async function addRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter the department ID for the role:",
    },
  ]);

  // Query the department table to check if the provided department_id exists
  const [department] = await connection
    .promise()
    .query("SELECT * FROM department WHERE id = ?", [department_id]);

  if (department.length === 0) {
    console.log("Department with the provided ID does not exist.");
    return;
  }

  // If the department exists, insert the role into the role table
  connection.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [title, salary, department_id],
    function (err, result) {
      if (err) throw err;
      console.log("Role added successfully!");
    }
  );
}

// Function to add an employee
async function addEmployee() {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the role ID for the employee:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager ID for the employee (if any):",
    },
  ]);

  connection.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [first_name, last_name, role_id, manager_id],
    function (err, result) {
      if (err) throw err;
      console.log("Employee added successfully!");
    }
  );
}

// Function to update an employee role
async function updateEmployeeRole() {
  const { employee_id, new_role } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter the ID of the employee you want to update:",
    },
    {
      type: "list",
      name: "new_role",
      message: "Select the new role for the employee:",
      choices: [
        { name: "Manager", value: 1 },
        { name: "Employee", value: 2 },
      ],
    },
  ]);

  // Parse input values as integers
  const parsedEmployeeId = parseInt(employee_id);
  const parsedNewRoleId = parseInt(new_role);

  // Validate input values
  if (isNaN(parsedEmployeeId) || isNaN(parsedNewRoleId)) {
    console.log(
      "Please enter valid integer values for employee ID and role ID."
    );
    return;
  }

  connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [parsedNewRoleId, parsedEmployeeId],
    function (err, result) {
      if (err) {
        console.error("Error updating employee role:", err);
        return;
      }
      console.log("Employee role updated successfully!");
    }
  );
}

// Function to update an employee manager
async function updateEmployeeManager() {
  const { employee_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter the ID of the employee you want to update:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the new manager ID for the employee:",
    },
  ]);

  // Parse input values as integers
  const parsedEmployeeId = parseInt(employee_id);
  const parsedManagerId = parseInt(manager_id);

  // Validate input values
  if (isNaN(parsedEmployeeId) || isNaN(parsedManagerId)) {
    console.log(
      "Please enter valid integer values for employee ID and manager ID."
    );
    return;
  }

  connection.query(
    "UPDATE employee SET manager_id = ? WHERE id = ?",
    [parsedManagerId, parsedEmployeeId],
    function (err, result) {
      if (err) {
        console.error("Error updating employee manager:", err);
        return;
      }
      console.log("Employee manager updated successfully!");
    }
  );
}

// Function to delete a department
async function deleteDepartment() {
  const { department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "department_id",
      message: "Enter the ID of the department you want to delete:",
    },
  ]);

  // Parse input value as integer
  const parsedDepartmentId = parseInt(department_id);

  // Validate input value
  if (isNaN(parsedDepartmentId)) {
    console.log("Please enter a valid integer value for department ID.");
    return;
  }

  connection.query(
    "DELETE FROM department WHERE id = ?",
    [parsedDepartmentId],
    function (err, result) {
      if (err) {
        console.error("Error deleting department:", err);
        return;
      }
      console.log("Department deleted successfully!");
    }
  );
}

// Function to delete a role
async function deleteRole() {
  const { role_id } = await inquirer.prompt([
    {
      type: "input",
      name: "role_id",
      message: "Enter the ID of the role you want to delete:",
    },
  ]);

  // Parse input value as integer
  const parsedRoleId = parseInt(role_id);

  // Validate input value
  if (isNaN(parsedRoleId)) {
    console.log("Please enter a valid integer value for role ID.");
    return;
  }

  connection.query(
    "DELETE FROM role WHERE id = ?",
    [parsedRoleId],
    function (err, result) {
      if (err) {
        console.error("Error deleting role:", err);
        return;
      }
      console.log("Role deleted successfully!");
    }
  );
}

// Function to delete an employee
async function deleteEmployee() {
  const { employee_id } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter the ID of the employee you want to delete:",
    },
  ]);

  // Parse input value as integer
  const parsedEmployeeId = parseInt(employee_id);

  // Validate input value
  if (isNaN(parsedEmployeeId)) {
    console.log("Please enter a valid integer value for employee ID.");
    return;
  }

  connection.query(
    "DELETE FROM employee WHERE id = ?",
    [parsedEmployeeId],
    function (err, result) {
      if (err) {
        console.error("Error deleting employee:", err);
        return;
      }
      console.log("Employee deleted successfully!");
    }
  );
}

// Function to view the total utilized budget of a department
async function viewDepartmentBudget() {
  const { department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "department_id",
      message: "Enter the ID of the department to view its budget:",
    },
  ]);

  // Parse input value as integer
  const parsedDepartmentId = parseInt(department_id);

  // Validate input value
  if (isNaN(parsedDepartmentId)) {
    console.log("Please enter a valid integer value for department ID.");
    return;
  }

  connection.query(
    "SELECT SUM(role.salary) AS total_budget FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?",
    [parsedDepartmentId],
    function (err, results) {
      if (err) {
        console.error("Error fetching department budget:", err);
        return;
      }
      const totalBudget = results[0].total_budget;
      console.log(
        `Total budget of Department ${parsedDepartmentId}: $${totalBudget}`
      );
    }
  );
}

// Export all other functions...
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudget, // Add the new function here
};
