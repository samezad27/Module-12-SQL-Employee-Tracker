const { prompt, default: inquirer } = require("inquirer");
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
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update an employee",
        "Exit",
      ],
    },
  ]);

  console.log(choice);
  switch (choice) {
    case "View all departments":
      results = await viewAllDepartments();
      console.table(results);
      break;
    case "View all employees":
      results = await viewAllEmployees();
      console.table(results);
      break;
    case "View all roles":
      results = await viewAllRoles();
      console.table(results);
      break;

    // add a department works
    case "Add a department":
      const { name } = await prompt([
        {
          type: "input",
          name: "name",
          message: "What department do you want to add?",
        },
      ]);
      results = await addDepartment(name);
      console.table(results);
      break;
    //add a role does not work

    case "Add a role":
      const newRole = await addRole();
      console.table(newRole);
      break;

    case "Add an employee":
      results = await addEmployee();
      console.table(results);
      break;

    case "Remove an employee":
      results = await removeEmployee();
      console.table(results);
      break;
    case "Remove a role":
      results = await removeRole();
      console.table(results);
      break;
    case "Remove a department":
      results = await removeDepartment();
      console.table(results);
      break;
    case "Update an employee":
      results = await updateEmployee();
      console.table(results);
      break;
    case "Exit":
      console.log("Have a nice day!");
      process.exit();
  }
  start(false);
};

start(true);
