// index.js

const inquirer = require("inquirer");
const {
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
  viewDepartmentBudget, // Add this import
} = require("../queries");

async function main() {
  while (true) {
    const { choice } = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View department budget", // Add this option
        "Exit",
      ],
    });

    switch (choice) {
      case "View all departments":
        await viewAllDepartments();
        break;
      case "View all roles":
        await viewAllRoles();
        break;
      case "View all employees":
        await viewAllEmployees();
        break;
      case "Add a department":
        await addDepartment();
        break;
      case "Add a role":
        await addRole();
        break;
      case "Add an employee":
        await addEmployee();
        break;
      case "Update an employee role":
        await updateEmployeeRole();
        break;
      case "Delete a department":
        await deleteDepartment();
        break;
      case "Delete a role":
        await deleteRole();
        break;
      case "Delete an employee":
        await deleteEmployee();
        break;
      case "View department budget": // Handle the new option
        await viewDepartmentBudget();
        break;
      case "Exit":
        console.log("Goodbye!");
        process.exit(0);
    }
  }
}

main();
