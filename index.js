const { prompt } = require("inquirer");
const db = require("./db/connection");
const {
  viewAllDepartments,
  addDepartment,
  removeDepartment,
} = require("./db/departments");
const {
  viewAllEmployees,
  addEmployee,
  removeEmployee,
  updateEmployee,
} = require("./db/employees");
const { viewAllRoles, addRole, removeRole } = require("./db/roles");

const start = async () => {
  console.log("Welcome to the Employee Manager!");
  const { choice } = await prompt([
    {
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
        "Exit",
      ],
    },
  ]);

  let results;
  switch (choice) {
    case "View all departments":
      results = await viewAllDepartments();
      console.table(results[0]);
      break;
    case "View all employees":
      results = await viewAllEmployees();
      console.table(results[0]);
      break;
    case "View all roles":
      results = await viewAllRoles();
      console.table(results[0]);
      break;
    case "Add a department":
      results = await addDepartment();
      console.table(results[0]);
      break;
    case "Add a role":
      results = await addRole();
      console.table(results[0]);
      break;
    case "Add an employee":
      results = await addEmployee();
      console.table(results[0]);
      break;
    case "Remove an employee":
      results = await removeEmployee();
      console.table(results[0]);
      break;
    case "Remove a role":
      results = await removeRole();
      console.table(results[0]);
      break;
    case "Remove a department":
      results = await removeDepartment();
      console.table(results[0]);
      break;
    case "Update an employee":
      results = await updateEmployee();
      console.table(results[0]);
      break;
    case "Exit":
      process.exit();
  }
  start();
};

start();
